"""
[Project Seth] Discord Claude Runner
노트북에서 켜두면 디스코드 채널의 멘션이나 !claude 명령을 감지하여
로컬 Claude Code CLI를 백그라운드에서 실행하고 결과를 회신합니다.

필요 패키지:
    pip install discord.py
실행:
    (Windows PowerShell)
    $env:DISCORD_BOT_TOKEN="your_bot_token"
    python discord_runner.py

    (Mac/Linux)
    export DISCORD_BOT_TOKEN="your_bot_token"
    python discord_runner.py
"""

import os
import subprocess
import asyncio
import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

PROJECT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

async def send_long_message(channel, text: str):
    """디스코드 2000자 제한을 고려하여 긴 텍스트를 분할 전송"""
    while len(text) > 1900:
        chunk = text[:1900]
        # 줄바꿈 단위로 자르기 시도
        last_newline = chunk.rfind('\n')
        if last_newline != -1:
            chunk = text[:last_newline]
            text = text[last_newline + 1:]
        else:
            text = text[1900:]
        await channel.send(f"```\n{chunk}\n```")
    if text.strip():
        await channel.send(f"```\n{text}\n```")

async def run_claude_in_background(prompt: str, channel):
    status_msg = await channel.send(f"🚀 **Claude Code 작업 시작!**\n> 📋 명령: `{prompt}`\n> ⏳ 로컬 터미널에서 작업 중입니다...")

    def blocking_run():
        return subprocess.run(
            ["claude", "-p", prompt],
            cwd=PROJECT_DIR,
            capture_output=True,
            text=True,
            timeout=900,  # 최대 15분
            shell=True if os.name == 'nt' else False
        )

    loop = asyncio.get_running_loop()
    try:
        process = await loop.run_in_executor(None, blocking_run)
        output = process.stdout if process.stdout else process.stderr
        if not output.strip():
            output = "(출력 내용 없음 / 정상 종료)"

        await channel.send("✅ **Claude Code 작업 완료!**")
        await send_long_message(channel, output)

    except subprocess.TimeoutExpired:
        await channel.send("⚠️ **시간 초과**: 15분 제한 시간을 초과하여 작업이 중단되었습니다.")
    except Exception as e:
        await channel.send(f"❌ **실행 오류**: `{str(e)}`\n(노트북 터미널에 `claude` 명령어가 설치되어 있는지 확인해 주세요)")

@bot.command(name="claude")
async def claude_cmd(ctx, *, prompt: str):
    await run_claude_in_background(prompt, ctx.channel)

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return

    # 봇 멘션으로 호출했을 때도 처리
    if bot.user in message.mentions:
        cleaned_prompt = message.clean_content.replace(f"@{bot.user.name}", "").strip()
        if cleaned_prompt:
            await run_claude_in_background(cleaned_prompt, message.channel)
            return

    await bot.process_commands(message)

@bot.event
async def on_ready():
    print("=" * 50)
    print(f"⚡ Discord Claude Runner 로그인 성공: {bot.user}")
    print(f"📁 작업 디렉토리: {PROJECT_DIR}")
    print("📱 이제 디스코드에서 !claude <명령> 또는 봇 멘션으로 일시키세요!")
    print("=" * 50)

if __name__ == "__main__":
    token = os.environ.get("DISCORD_BOT_TOKEN")
    if not token:
        print("ERROR: DISCORD_BOT_TOKEN 환경변수가 설정되지 않았습니다.")
        print("사용법: DISCORD_BOT_TOKEN='토큰값' python discord_runner.py")
        exit(1)
    bot.run(token)
