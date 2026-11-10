"""
[Project Seth] Slack Socket Mode Claude Runner
노트북에서 켜두면 슬랙 채널의 멘션을 감지하여 로컬 Claude Code CLI를 실행하고 결과를 회신합니다.

필요 패키지:
    pip install slack_bolt
실행:
    export SLACK_BOT_TOKEN="xoxb-..."
    export SLACK_APP_TOKEN="xapp-..."
    python slack_runner.py
"""

import os
import subprocess
import threading
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

app = App(token=os.environ.get("SLACK_BOT_TOKEN"))

PROJECT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

def execute_claude_task(prompt: str, say, thread_ts: str):
    say(f"🚀 Claude Code 작업 착수 중...\n`명령`: {prompt}", thread_ts=thread_ts)
    
    try:
        # Claude Code CLI 비대화형 실행 (--print 또는 프롬프트 전달)
        cmd = ["claude", "-p", prompt]
        process = subprocess.run(
            cmd,
            cwd=PROJECT_DIR,
            capture_output=True,
            text=True,
            timeout=600  # 최대 10분
        )
        
        output = process.stdout if process.stdout else process.stderr
        if len(output) > 2800:
            output = output[:2800] + "\n... (출력 내용이 길어 일부 생략됨)"
            
        say(f"✅ **Claude Code 작업 완료!**\n```\n{output}\n```", thread_ts=thread_ts)
        
    except subprocess.TimeoutExpired:
        say("⚠️ 10분 제한 시간 초과로 작업이 중단되었습니다.", thread_ts=thread_ts)
    except Exception as e:
        say(f"❌ 실행 중 오류 발생: {str(e)}", thread_ts=thread_ts)

@app.event("app_mention")
def handle_mention(body, say):
    event = body.get("event", {})
    text = event.get("text", "")
    thread_ts = event.get("thread_ts") or event.get("ts")
    
    # 봇 멘션 태그 제거
    cleaned_prompt = " ".join([word for word in text.split() if not word.startswith("<@")])
    if not cleaned_prompt:
        say("실행할 명령을 입력해 주세요. (예: `@claude-bot 이슈 1번 구현해줘`)", thread_ts=thread_ts)
        return
        
    # 백그라운드 스레드에서 클로드 코드 실행
    thread = threading.Thread(target=execute_claude_task, args=(cleaned_prompt, say, thread_ts))
    thread.start()

if __name__ == "__main__":
    app_token = os.environ.get("SLACK_APP_TOKEN")
    if not app_token:
        print("ERROR: SLACK_APP_TOKEN 환경변수가 설정되지 않았습니다.")
        exit(1)
    handler = SocketModeHandler(app, app_token)
    print("⚡ Slack Claude Code 러너 가동 시작! 슬랙 채널에서 멘션 대기 중...")
    handler.start()
