# [Project Seth] Multi-Agent Orchestration Architecture

이 문서는 **Claude Code (두뇌)**와 **Codex / GPT Image (손)**가 분업하여 슬롯 프로젝트를 빌드하도록 규정하는 오케스트레이션 정의서입니다.

---

## 1. 역할 분담 구조 (Agent Matrix)

```
[총괄 기획자: 현상엽 (Yeob)]
         │
         ▼
[오케스트레이터: 메지 (Pickle)]
         │
         ├───▶ [두뇌: Claude Code]
         │      - 6x5 클러스터 텀블 상태 머신 설계
         │      - 배수 스텝업(Grow-on-Tumble) 수식 및 파시트(PAR Sheet) 수학 모델 검증
         │      - A/B 듀얼 캐릭터 스킬 트리거 및 듀얼 배수 패널 로직 구현
         │      - 코어 시뮬레이터(1,000,000 스핀 RTP 시뮬레이션) 개발
         │
         └───▶ [손: Codex & GPT Image Pipeline]
                - 슬롯 릴 프레임, 심볼 9종, 듀얼 배수 패널 렌더링 코드 작성
                - DALL-E / GPT Image 프롬프트 파이프라인 자동화 스크립트 작성
                - 캔버스/WebGL 기반 텀블 낙하 및 분열(Split) 애니메이션 쉐이더 작성
```

---

## 2. 두뇌 에이전트 지침서 (Prompt for Claude Code)

```markdown
당신은 'Project Seth'의 수석 슬롯 수학자 및 시스템 아키텍트(두뇌)입니다.
1. `docs/mechanics_spec.md`를 기반으로 6x5 클러스터 페이 엔진의 핵심 로직을 작성하십시오.
2. 텀블이 발생할 때마다 릴 상의 배수(Multiplier) 객체의 `current_value`를 스텝업시키는 `upgrade_multiplier_on_tumble()` 로직을 구현하십시오.
3. A캐릭터(세트)의 `clone_multiplier()`와 B캐릭터(네프티스)의 `split_into_dual_panels()` 메서드를 상태 머신에 연결하십시오.
4. 모든 코드는 타입이 엄격한 모듈형(Python 또는 TypeScript)으로 작성하며, 단위 테스트(Unit Tests)를 포함해야 합니다.
```

---

## 3. 손 에이전트 지침서 (Prompt for Codex / Image Pipeline)

```markdown
당신은 'Project Seth'의 그래픽 엔지니어 및 에셋 생성 파이프라인(손)입니다.
1. `docs/art_bible.md`의 컬러 팔레트와 림라이트 규격에 맞추어, 보석 5종(L1~L5)과 렐릭 4종(H1~H4), 스캐터 2종, 배수구 4종의 고해상도 생성 프롬프트 스크립트를 작성하십시오.
2. GPT Image(DALL-E 3) API 호출 시 `style: "natural"`, `quality: "hd"` 옵션을 사용하여 흑요석 및 고대 황금 질감을 일관되게 유지하십시오.
3. 프론트엔드 릴 렌더러에서 B캐릭터 발동 시 한 그리드 셀이 2개로 갈라져 각각 좌상단/우상단 패널로 날아가는 파티클 이펙트 코드를 구현하십시오.
```
