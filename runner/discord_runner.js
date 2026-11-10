const { Client, GatewayIntentBits } = require('discord.js');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const PROJECT_DIR = path.resolve(__dirname, '..');

// 토큰 가져오기 (환경변수 -> 인자값 -> token.txt)
let token = process.env.DISCORD_BOT_TOKEN;
if (!token && process.argv.length > 2) {
    token = process.argv[2].trim();
}
const tokenFile = path.join(__dirname, 'token.txt');
if (!token && fs.existsSync(tokenFile)) {
    token = fs.readFileSync(tokenFile, 'utf-8').trim();
}

if (!token) {
    console.error("=".repeat(50));
    console.error("ERROR: 디스코드 봇 토큰이 없습니다!");
    console.error("사용법: node discord_runner.js 복사한토큰");
    console.error("=".repeat(50));
    process.exit(1);
}

client.once('ready', () => {
    console.log("=".repeat(50));
    console.log(`⚡ Discord Claude Runner (Node.js) 로그인 성공: ${client.user.tag}`);
    console.log(`📁 작업 디렉토리: ${PROJECT_DIR}`);
    console.log("📱 이제 디스코드에서 !claude <명령> 또는 봇 멘션으로 일시키세요!");
    console.log("=".repeat(50));
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    let prompt = null;
    if (message.content.startsWith('!claude')) {
        prompt = message.content.replace('!claude', '').trim();
    } else if (message.mentions.has(client.user)) {
        prompt = message.content.replace(new RegExp(`<@!?${client.user.id}>`), '').trim();
    }

    if (!prompt) return;

    await message.channel.send(`🚀 **Claude Code 작업 시작!**\n> 📋 명령: \`${prompt}\`\n> ⏳ 로컬 터미널에서 작업 중입니다...`);

    const claude = spawn('claude', ['-p', prompt], {
        cwd: PROJECT_DIR,
        shell: true
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

        // 1900자씩 분할 전송
        while (output.length > 1900) {
            let chunk = output.substring(0, 1900);
            const lastNl = chunk.lastIndexOf('\n');
            if (lastNl !== -1) {
                chunk = output.substring(0, lastNl);
                output = output.substring(lastNl + 1);
            } else {
                output = output.substring(1900);
            }
            await message.channel.send(`\`\`\`\n${chunk}\n\`\`\``);
        }
        if (output.trim()) {
            await message.channel.send(`\`\`\`\n${output}\n\`\`\``);
        }
    });
});

client.login(token).catch(err => {
    console.error("❌ 로그인 실패! 토큰을 확인해 주세요:", err.message);
});
