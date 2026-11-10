# [Project Seth] 6x5 Cluster Cascading Slot Mechanics Specification

- **프로젝트명**: Project Seth (타겟: 대만 소셜 카지노)
- **장르**: 6x5 Cluster Pays, Cascading Tumble Video Slot
- **기획자**: 현상엽 (Yeob)
- **오케스트레이션**: 메지 (Pickle)

---

## 1. 기본 룰 및 그리드 (Base Rules & Grid)
- **릴 규격**: 6 Reels x 5 Rows (총 30개 심볼 그리드)
- **페이 방식**: Scatter / Cluster Pays (화면 어느 위치에든 동일 심볼 8개 이상 등장 시 당첨)
- **텀블(Tumble / Cascading)**:
  - 당첨된 심볼은 0.3초 내에 모래화 입자로 소멸.
  - 상단 심볼들이 아래로 낙하(Drop)하고, 빈 공간에 새로운 심볼이 보충됨.
  - 추가 당첨이 없을 때까지 연쇄(Cascade) 반복.

---

## 2. 핵심 차별화 메커니즘 (Key Innovations)

### 2.1 텀블 연동 배수 스텝업 (Grow-on-Tumble Progressive Multiplier)
- **발동 규칙**:
  - 릴 위에 일반 배수 심볼(Multiplier Orb, 예: 2x)이 등장한 상태에서 텀블 윈(Win)이 발생하면, 배수 수치가 즉시 강화(Step-up)됨.
  - 예: `2x` -> `3x` -> `4x` -> ... 고배수(예: `50x`)인 경우 `65x` 등으로 비례 스텝업.
- **정산 방식**:
  - 한 스핀의 모든 텀블 연쇄가 종료되었을 때, 최종 도달한 배수 수치들을 합산하여 해당 스핀의 총 획득 윈에 곱함.

### 2.2 듀얼 캐릭터 시스템 (Dual Characters System)

#### [Character A: 세트 (Seth) - 파괴와 증폭의 신]
- **배치**: 릴 우측 상시 배치 (Active)
- **특수 스킬 (Multiplier Cloner)**:
  - 스핀의 모든 윈 텀블 연쇄가 완전히 종료된 마지막 순간에 확률적으로 발동.
  - 릴 위에 남아있는 가장 높은 배수 심볼을 릴 그리드의 빈자리/저배당 위치에 1개씩 복제(Duplicate)하여 추가 배치.
  - 윈 플로우가 이미 끝난 시점이므로 타 심볼을 덮어써도 게임 로직에 영향 없음.

#### [Character B: 네프티스 (Nephthys) - 슈퍼 프리스핀 전용 히든 캐릭터]
- **배치**: 릴 좌측 배치
- **상태 전이**:
  - **일반 모드**: 흑요석 석상처럼 어둡고 흐릿한 비활성(Inactive / Ghost) 상태.
  - **슈퍼 프리스핀 진입 시**: 신성한 오라와 함께 전면 활성화(Awakened).
- **특수 스킬 (Symbol Fission & Dual Panels)**:
  - B캐릭터가 활성화된 상태에서 힘을 쓰면, 타깃 배수 심볼이 한 그리드 칸 내에서 디자인이 서로 다른 2개의 배수 심볼로 분열(Split).
  - 분열된 배수 1: **[기본 배수 패널 (Main Multiplier Panel)]**로 흡수 누적.
  - 분열된 배수 2: **[보너스 배수 패널 (Bonus Multiplier Panel)]**로 흡수 누적.
  - *보너스 배수 패널은 B캐릭터가 깨어난 슈퍼 프리스핀 모드에서만 열리고 누적되는 특수 패널임.*

---

## 3. 프리스핀 및 슈퍼 프리스핀 진입 규칙 (Trigger Rules)

1. **일반 프리스핀 (Normal Free Spins)**:
   - 스캐터(황금 성갑충) 4개 이상 매칭 시 진입 (15회 무료 스핀).
   - 배수는 리셋되지 않고 지속 누적.
2. **슈퍼 프리스핀 (Super Free Spins)**:
   - 릴 위에 떨어진 스캐터 중 **단 1개라도 '슈퍼 스캐터(Super Scarab)'를 포함**하고 있으면 슈퍼 프리스핀으로 즉시 승격 진입.
   - B캐릭터 완전 각성 + [보너스 배수 패널] 언락.
   - 심볼 분열 기능 상시 발동 대기.
