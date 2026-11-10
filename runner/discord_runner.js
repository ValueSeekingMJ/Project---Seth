const dns = require('dns');
try {
    dns.setDefaultResultOrder('ipv4first');
} catch (e) {}

const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

let OpenAI;
try {
    OpenAI = require('openai');
} catch (e) {
    OpenAI = null;
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const PROJECT_DIR = path.resolve(__dirname, '..');

// 0. 설정 파일 로드 (config.json)
let config = {
    codex_model: "6.1",
    image_model: "gpt-image",
    fallback_codex_model: "gpt-4o",
    fallback_image_model: "dall-e-3"
};
const configFile = path.join(__dirname, 'config.json');
if (fs.existsSync(configFile)) {
    try {
        config = { ...config, ...JSON.parse(fs.readFileSync(configFile, 'utf-8')) };
    } catch (e) {
        console.error("config.json 파싱 오류:", e.message);
    }
}

// 1. 디스코드 토큰 로드
let discordToken = process.env.DISCORD_BOT_TOKEN;
if (!discordToken && process.argv.length > 2) {
    discordToken = process.argv[2].trim();
}
const tokenFile = path.join(__dirname, 'token.txt');
if (!discordToken && fs.existsSync(tokenFile)) {
    discordToken = fs.readFileSync(tokenFile, 'utf-8').trim();
}

// 2. OpenAI API 키 로드
let openaiApiKey = process.env.OPENAI_API_KEY;
const openaiKeyFile = path.join(__dirname, 'openai_key.txt');
if (!openaiApiKey && fs.existsSync(openaiKeyFile)) {
    openaiApiKey = fs.readFileSync(openaiKeyFile, 'utf-8').trim();
}

let openaiClient = null;
if (OpenAI && openaiApiKey) {
    openaiClient = new OpenAI({ 
        apiKey: openaiApiKey,
        timeout: 60000
    });
}

if (!discordToken) {
    console.error("=".repeat(50));
    console.error("ERROR: 디스코드 봇 토큰이 없습니다!");
    console.error("사용법: node discord_runner.js 복사한토큰");
    console.error("=".repeat(50));
    process.exit(1);
}

async function sendLongMessage(channel, text) {
    while (text.length > 1900) {
        let chunk = text.substring(0, 1900);
        const lastNl = chunk.lastIndexOf('\n');
        if (lastNl !== -1) {
            chunk = text.substring(0, lastNl);
            text = text.substring(lastNl + 1);
        } else {
            text = text.substring(1900);
        }
        await channel.send(`\`\`\`\n${chunk}\n\`\`\``);
    }
    if (text.trim()) {
        await channel.send(`\`\`\`\n${text}\n\`\`\``);
    }
}

// 자동 Git Push 함수
function autoGitPush(commitMessage) {
    try {
        console.log("🔄 Git 자동 동기화 시작...");
        execSync('git add .', { cwd: PROJECT_DIR, stdio: 'ignore' });
        try {
            execSync(`git commit -m "${commitMessage}"`, { cwd: PROJECT_DIR, stdio: 'ignore' });
        } catch (e) {
            // 커밋할 변경사항이 없으면 통과
        }
        execSync('git push origin main', { cwd: PROJECT_DIR, stdio: 'ignore' });
        console.log("✅ Git Push 완료!");
        return true;
    } catch (err) {
        console.error("⚠️ Git Push 실패:", err.message);
        return false;
    }
}

client.once('ready', () => {
    console.log("=".repeat(50));
    console.log(`⚡ Discord Claude & Codex Runner 로그인 성공: ${client.user.tag}`);
    console.log(`📁 작업 디렉토리: ${PROJECT_DIR}`);
    if (openaiClient) {
        console.log(`✨ OpenAI API 활성화! (Codex 모델: ${config.codex_model}, Image 모델: ${config.image_model})`);
    } else {
        console.log(`ℹ️ OpenAI API 키 미설정 (runner/openai_key.txt 파일 생성 시 활성화)`);
    }
    console.log("📱 웹훅 및 디스코드 원격 명령 대기 중!");
    console.log("=".repeat(50));
});

client.on('messageCreate', async (message) => {
    // 봇 본인이 보낸 답장만 무시 (무한 루프 방지, 웹훅 메시지는 정상 수신)
    if (message.author.id === client.user.id) return;

    const content = message.content.trim();

    // 1. GPT 이미지 생성 (!image)
    if (content.startsWith('!image')) {
        const prompt = content.replace('!image', '').trim();
        if (!prompt) {
            await message.channel.send("생성할 이미지 프롬프트를 입력해 주세요. (예: `!image 고대 이집트 세트 슬롯 황금 마스크 심볼`)");
            return;
        }

        // 실시간으로 키 파일 재확인 (러너 재실행 없이도 키 파일 인식)
        if (!openaiClient && fs.existsSync(openaiKeyFile)) {
            const freshKey = fs.readFileSync(openaiKeyFile, 'utf-8').trim();
            if (freshKey && OpenAI) {
                openaiClient = new OpenAI({ apiKey: freshKey, timeout: 60000 });
            }
        }

        if (!openaiClient) {
            await message.channel.send("⚠️ OpenAI API 키가 설정되지 않았습니다. `runner/openai_key.txt` 파일에 키를 넣어주세요.");
            return;
        }

        const statusMsg = await message.channel.send(`🎨 **이미지 렌더링 시작...**\n> 📋 프롬프트: \`${prompt}\`\n> ⏳ 고해상도 에셋 렌더링 중입니다...`);

        try {
            let imgModel = config.image_model;
            let response;
            try {
                response = await openaiClient.images.generate({
                    model: imgModel,
                    prompt: prompt,
                    n: 1,
                    size: "1024x1024"
                });
            } catch (modelErr) {
                console.log(`기본 모델(${imgModel}) 실패, 폴백(${config.fallback_image_model}) 시도:`, modelErr.message);
                if (config.fallback_image_model && config.fallback_image_model !== imgModel) {
                    response = await openaiClient.images.generate({
                        model: config.fallback_image_model,
                        prompt: prompt,
                        n: 1,
                        size: "1024x1024"
                    });
                } else {
                    throw modelErr;
                }
            }

            const imageUrl = response.data[0].url;
            await message.channel.send({
                content: `✅ **에셋 생성 완료!**\n> 프롬프트: \`${prompt}\``,
                files: [imageUrl]
            });
        } catch (err) {
            console.error("이미지 생성 에러 상세:", err);
            await message.channel.send(`❌ 이미지 생성 오류: \`${err.name}: ${err.message}\``);
        }
        return;
    }

    // 2. Codex (!codex)
    if (content.startsWith('!codex')) {
        const prompt = content.replace('!codex', '').trim();
        if (!prompt) {
            await message.channel.send("명령을 입력해 주세요. (예: `!codex 6x5 클러스터 텀블 상태 머신 코드 짜줘`)");
            return;
        }

        if (!openaiClient && fs.existsSync(openaiKeyFile)) {
            const freshKey = fs.readFileSync(openaiKeyFile, 'utf-8').trim();
            if (freshKey && OpenAI) {
                openaiClient = new OpenAI({ apiKey: freshKey, timeout: 60000 });
            }
        }

        if (!openaiClient) {
            await message.channel.send("⚠️ OpenAI API 키가 설정되지 않았습니다. `runner/openai_key.txt` 파일에 키를 넣어주세요.");
            return;
        }

        const statusMsg = await message.channel.send(`⚙️ **Codex 작업 중...**\n> 📋 명령: \`${prompt}\``);

        try {
            let codexModel = config.codex_model;
            let completion;
            try {
                completion = await openaiClient.chat.completions.create({
                    model: codexModel,
                    messages: [
                        {
                            role: "system",
                            content: "당신은 Project Seth 슬롯 게임의 수석 엔지니어(Codex)입니다. 6x5 클러스터 텀블, 배수 스텝업, 듀얼 캐릭터 연출 및 쉐이더 코드를 전문적으로 작성합니다."
                        },
                        { role: "user", content: prompt }
                    ]
                });
            } catch (modelErr) {
                if (config.fallback_codex_model && config.fallback_codex_model !== codexModel) {
                    completion = await openaiClient.chat.completions.create({
                        model: config.fallback_codex_model,
                        messages: [
                            {
                                role: "system",
                                content: "당신은 Project Seth 슬롯 게임의 수석 엔지니어(Codex)입니다. 6x5 클러스터 텀블, 배수 스텝업, 듀얼 캐릭터 연출 및 쉐이더 코드를 전문적으로 작성합니다."
                            },
                            { role: "user", content: prompt }
                        ]
                    });
                } else {
                    throw modelErr;
                }
            }

            const reply = completion.choices[0].message.content;
            await message.channel.send(`✅ **Codex 작업 완료!**`);
            await sendLongMessage(message.channel, reply);

            // 파일 저장 및 자동 깃 푸시
            const docsDir = path.join(PROJECT_DIR, 'docs');
            if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });
            fs.writeFileSync(path.join(docsDir, 'codex_latest_output.md'), reply, 'utf-8');
            if (autoGitPush("docs: Codex 최신 작업물 자동 동기화")) {
                await message.channel.send("🚀 **GitHub 자동 푸시 완료!** 피클이 최신 코드를 즉시 읽을 수 있습니다.");
            }
        } catch (err) {
            await message.channel.send(`❌ Codex 실행 오류: \`${err.name}: ${err.message}\``);
        }
        return;
    }

    // 3. Claude Code CLI (!claude 또는 멘션)
    let claudePrompt = null;
    if (content.startsWith('!claude')) {
        claudePrompt = content.replace('!claude', '').trim();
    } else if (message.mentions && message.mentions.has && message.mentions.has(client.user)) {
        claudePrompt = message.clean_content.replace(new RegExp(`<@!?${client.user.id}>`), '').trim();
    }

    if (!claudePrompt) return;

    await message.channel.send(`🚀 **Claude Code 작업 시작!**\n> 📋 명령: \`${claudePrompt.substring(0, 100)}...\`\n> ⏳ 로컬 터미널에서 작업 중입니다...`);

    const claude = spawn('claude', ['-p', '--dangerously-skip-permissions'], {
        cwd: PROJECT_DIR,
        shell: true,
        stdio: ['pipe', 'pipe', 'pipe']
    });

    let output = '';
    claude.stdout.on('data', (data) => { output += data.toString(); });
    claude.stderr.on('data', (data) => { output += data.toString(); });

    claude.on('error', async (err) => {
        await message.channel.send(`❌ **실행 오류**: \`${err.message}\`\n(터미널에 claude 명령어가 설치되어 있는지 확인해 주세요)`);
    });

    claude.on('close', async (code) => {
        if (!output.trim()) output = "(출력 내용 없음 / 정상 종료)";
        await message.channel.send(`✅ **Claude Code 작업 완료!** (종료 코드: ${code})`);
        await sendLongMessage(message.channel, output);

        // 출력 결과 자동 파일 저장 및 Git Push
        try {
            const docsDir = path.join(PROJECT_DIR, 'docs');
            if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });
            fs.writeFileSync(path.join(docsDir, 'art_director_spec.md'), output, 'utf-8');
            if (autoGitPush("docs: Claude Code 아트 디렉팅 기획서 자동 저장 및 푸시")) {
                await message.channel.send("🚀 **GitHub에 자동 커밋 & 푸시 완료!** 피클이 실시간으로 기획서를 읽어옵니다.");
            }
        } catch (saveErr) {
            console.error("자동 파일 저장/푸시 오류:", saveErr.message);
        }
    });

    // stdin으로 프롬프트 온전히 전달 후 닫기
    try {
        claude.stdin.write(claudePrompt);
        claude.stdin.end();
    } catch (e) {
        console.error("stdin write error:", e);
    }
});

client.login(discordToken).catch(err => {
    console.error("❌ 로그인 실패! 토큰을 확인해 주세요:", err.message);
});
