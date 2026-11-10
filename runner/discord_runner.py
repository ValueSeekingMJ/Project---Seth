"""
[Project Seth] Discord Claude Runner
노트북에서 켜두면 디스코드 채널의 명령(!run 또는 멘션)을 감지하여 로컬 Claude Code CLI를 실행하고 결과를 회신합니다.

필요 패키지:
    pip install discord.py
실행:
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

async def run_claude_in_background(prompt: str, channel):
    msg = await channel.send(f"🚀 **Claude Code 작업 착수!**\n`명령`: {prompt}")
    
    def blocking_run():
        return subprocess.run(
            ["claude", "-p", prompt],
            cwd=PROJECT_DIR,
            capture_output=True,
            text=True,
            timeout=600
        )
    
    loop = asyncio.get_running_loop()
    try:
        process = await loop.run_in_executor(None, blocking_run)
        output = process.stdout if process.stdout else process.stderr
        if len(output) > 1800:
            output = output[:1800] + "\n... (생략됨)"
        await channel.send(f"✅ **Claude Code 작업 완료!**\n```\n{output}\n```")
    except asyncio.TimeoutError:
        await channel.send("⚠️ 10분 제한 시간 초과로 작업이 중단되었습니다.")
    except Exception as e:
        await channel.send(f"❌ 오류 발생: {str(e)}")

@bot.command(name="claude")
async def claude_cmd(ctx, *, prompt: str):
    await run_claude_in_background(prompt, ctx.channel)

@bot.event
async def on_ready():
    print(f"⚡ Discord Claude Runner 로그인 성공: {bot.user}")

if __name__ == "__main__":
    token = os.environ.get("DISCORD_BOT_TOKEN")
    if not token:
        print("ERROR: DISCORD_BOT_TOKEN 환경변수가 필요합니다.")
        exit(1)
    bot.run(token)
