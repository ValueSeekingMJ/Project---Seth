# [Project Seth] 슬롯 비주얼 아트 디렉팅 기획서 (Art Director Spec)

- **문서 버전**: v1.1
- **작성일**: 2026-11-11
- **상위 문서**: `docs/art_bible.md` (컬러·조명·위계 원칙), `docs/mechanics_spec.md` (텀블·배수·듀얼 캐릭터 룰)
- **사용처**: 원화 발주, 3D/2.5D 심볼 제작, Spine/VFX 연출, GPT Image 에셋 생성 파이프라인
- **타겟**: 대만(Taiwan) 소셜 카지노, 모바일 세로/가로 겸용

---

## 0. 한 줄 비전 (Visual North Star)

> **"빛을 삼키는 흑요석 신전 위에서, 황금은 묵직하게 빛나고, 배수만이 핏빛 폭풍으로 폭발한다."**

- 화면의 **80%는 어둡고 조용하게**, **15%는 황금으로 고급스럽게**, **5%만 크림슨/고채도로 폭발**시킨다.
- 유저의 시선은 항상 `배수구 → 스캐터 → 고배당 렐릭 → 저배당 보석 → 배경` 순서로 흐르도록 설계한다.

---

## 1. 톤앤매너 (Tone & Manner)

### 1.1 핵심 키워드

| 축 | 키워드 | 시각 해석 |
| :--- | :--- | :--- |
| **무게감** | Heavy, Ancient, Sacred | 두꺼운 금속 양각, 깊은 음각 홈, 마모된 모서리 |
| **긴장감** | Storm, Chaos, Wrath | 모래폭풍 파티클, 크림슨 번개, 화면 진동 |
| **고급감** | Treasure, Royal, Polished | 거울 반사 골드, 커팅된 보석의 날카로운 하이라이트 |
| **신비감** | Hidden, Dormant, Awakening | 네프티스의 석상 → 각성 전이, 보랏빛 영혼 연기 |

### 1.2 모드별 컬러 스크립트 (Color Script)

| 모드 | 배경 지배색 | 대기 (Atmosphere) | 강조색 | 감정 곡선 |
| :--- | :--- | :--- | :--- | :--- |
| **Base Game** | Obsidian Slate `#121218` | Dune Sand Amber `#A67C38` 저농도 모래바람 | Ancient Gold `#D4AF37` | 차분한 긴장, 기대감 |
| **Free Spins** | Obsidian + 짙은 앰버 노을 | 모래폭풍 농도 2배, 원경 번개 | Sunfire Gold `#FFD700` | 고조, 폭풍 전야 |
| **Super Free Spins** | Obsidian + 딥 바이올렛 `#2A1840` 그라데이션 | 크림슨 번개 + 보랏빛 영혼 연기 | Seth Crimson `#E63946` + Nephthys Violet `#8E5CF7` | 절정, 신들의 강림 |

> `#2A1840`(Deep Underworld Violet), `#8E5CF7`(Nephthys Soul Violet)은 **슈퍼 프리스핀 전용 확장 팔레트**로 정의한다. Base Game에서는 사용 금지.

### 1.3 화면 레이어 구조 (Depth Stack, 뒤 → 앞)

1. **L0 원경**: 모래폭풍 하늘, 피라미드/신전 실루엣 (블러 8px, 명도 15% 이하)
2. **L1 중경**: 신전 기둥, 횃불 (약한 앰버 발광, 패럴랙스 0.2)
3. **L2 캐릭터**: 좌 네프티스 / 우 세트 (릴 프레임 바깥, 프레임과 15% 겹침 허용)
4. **L3 릴 프레임**: 흑요석 석판 + 황금 테두리 (Ancient Gold 양각)
5. **L4 릴 배경판**: `#121218`, 셀 구분선 Dune Sand Amber 20% opacity
6. **L5 심볼**: 드롭 섀도우 `#000000` 60%, Y+4px 오프셋
7. **L6 VFX**: 배수구 발광, 번개, 파티클 (Additive Blend)
8. **L7 UI/HUD**: 배수 패널, 윈 카운터, 스핀 버튼

### 1.4 대만 시장 로컬라이징 원칙

- **레드 & 골드 = 길조**: 크림슨과 골드의 조합은 큰 당첨 순간에만 아끼듯 사용해 "터졌다"는 감각을 극대화.
- **숫자 가독성**: 배수 숫자는 굵은 세리프 + 골드 베벨 + 검정 외곽선 3px. 모바일 최소 표기 28pt.
- **큰 승리 체감**: Big / Mega / Super Win 연출은 화면 진동, 금화 분수, 한자 병기 타이틀(大獎 / 巨獎 / 超級大獎)을 기본 패키지로 구성.
- **피로도 관리**: 텀블 연쇄가 길어질수록 연출을 짧게 압축 (5연쇄 이후 각 텀블 연출 20% 단축).

### 1.5 금지 사항 (Do Not)

- 플랫 2D 카툰, 애니메 스타일 얼굴, 플라스틱 장난감 질감
- 배경에 고채도 색 사용 (심볼 가독성 저하)
- 저배당 보석에 장식 과다 (0.3초 식별 원칙 위반)
- 벤치마크 타이틀(ATG 戰神賽特, Gates of Olympus 등)의 **캐릭터 디자인·구도·로고·UI 레이아웃을 직접 복제하는 것**. 벤치마크는 "시장이 반응하는 문법"만 참고하고, 모든 형태 언어는 Project Seth 고유로 제작한다.

---

## 2. 듀얼 캐릭터 원화 컨셉 (Dual Character Concept Art)

### 2.0 두 캐릭터의 대비 설계

| 항목 | Character A: 세트 (Seth) | Character B: 네프티스 (Nephthys) |
| :--- | :--- | :--- |
| **화면 위치** | 릴 우측 (상시 Active) | 릴 좌측 (평소 Inactive → 슈퍼 FS 각성) |
| **역할 키워드** | 파괴·증폭·폭풍 | 분열·수호·저승 |
| **실루엣** | 역삼각형, 각지고 날카로움, 수직 상승 | 원·곡선, 흐르는 베일, 날개 수평 확장 |
| **지배색** | 흑요석 + 앤션트 골드 + 크림슨 | 흑요석 + 페일 실버 골드 + 소울 바이올렛 |
| **발광 포인트** | 크림슨 안광, 지팡이 끝 번개 | 바이올렛 안광, 날개 깃털 끝 영혼 불꽃 |
| **무드** | 위압, 분노, 압도 | 고요, 신비, 각성 시 장엄 |
| **스킬** | Multiplier Cloner (배수 복제) | Symbol Fission (심볼 분열 & 듀얼 패널) |

> 원칙: 두 캐릭터를 나란히 놓았을 때 **실루엣만으로 즉시 구분**되어야 한다 (흑백 썸네일 64px 테스트 통과 필수).

### 2.1 Character A — 세트 (Seth), 파괴와 증폭의 신

**외형 컨셉**
- **머리**: 세트 동물(Seth-animal) 모티프의 길고 휘어진 주둥이와 끝이 각진 직립 귀. 얼굴은 흑요석 피부 + 황금 마스크가 반쯤 덮은 형태. 눈은 크림슨 발광(`#E63946`, 블룸 강함).
- **체형**: 상체 비대한 전사형, 어깨 폭 = 머리 폭의 3.5배. 인체 비례 8.5등신의 영웅 비율.
- **갑주**: 흑요석 판갑 위에 앤션트 골드 테두리 양각. 가슴 중앙에 크림슨 루비 코어(스킬 발동 시 맥동).
- **장신구**: 날개처럼 펼쳐진 황금 어깨 견갑, 허리에 붉은 천 로인클로스(모래바람에 휘날림 — 2차 모션 파츠).
- **무기**: H4 심볼과 연결되는 **Was Scepter(전신의 파괴 지팡이)**. 끝이 두 갈래로 갈라지고 그 사이에 크림슨 번개가 상시 미세하게 튐.

**상태별 포즈 시트 (발주 필수 6컷)**
| # | 상태 | 포즈 설명 | 트리거 |
| :--- | :--- | :--- | :--- |
| A-1 | Idle | 지팡이를 바닥에 짚고 정면 응시, 호흡 루프 (3초) | 상시 |
| A-2 | Anticipation | 고개를 릴 쪽으로 돌리며 지팡이를 들어 올림 | 텀블 3연쇄 이상 / 스캐터 3개 등장 |
| A-3 | Clone Cast | 지팡이를 릴 위로 겨누고 크림슨 번개 방출 | 배수 복제 스킬 발동 |
| A-4 | Roar | 상체를 젖히고 포효, 화면 진동 동반 | 스캐터 4개 이상 / FS 진입 |
| A-5 | Big Win | 팔짱 낀 채 거만한 미소, 뒤로 금화 분수 | Big Win 이상 |
| A-6 | Disappointed (선택) | 짧게 코웃음, 시선 회피 | 니어미스 (스캐터 3개 후 미등장) |

**Spine 리깅 파츠 분리 가이드**
- 머리 / 귀 L·R / 턱 / 상체 / 견갑 L·R / 팔 상·하 L·R / 손 L·R / 지팡이 / 로인클로스 3분할 / 다리 L·R / 루비 코어(발광 레이어 별도)
- 발광 요소(안광, 루비 코어, 지팡이 번개)는 **Additive 별도 레이어**로 분리 납품.

### 2.2 Character B — 네프티스 (Nephthys), 슈퍼 프리스핀 전용 히든 캐릭터

**외형 컨셉**
- **머리**: 이시스의 자매 여신. 머리 위에 상징 문양(집과 바구니 형태 히에로글리프)을 황금 관으로 재해석. 긴 흑발 + 보랏빛 영혼 실(soul thread)이 섞여 흐름.
- **얼굴**: 차분하고 엄숙한 표정. 실사 인간 얼굴은 지양하고 **석상과 신상 사이의 양식화된 얼굴**.
- **의상**: 몸에 밀착된 흑요석 비늘 드레스 + 페일 실버 골드 장식, 얇은 바이올렛 베일이 바닥까지 흐름.
- **날개**: 팔 아래로 펼쳐지는 수호의 날개. 깃털 끝마다 바이올렛 영혼 불꽃(`#8E5CF7`).
- **소품**: 양손에 영혼 저울 또는 두 개의 빛 구체 — **듀얼 패널(Main / Bonus)을 상징**하는 시각 장치.

**상태 전이 (State Machine Visual)**
| 상태 | 비주얼 규격 | 조명 | 모션 |
| :--- | :--- | :--- | :--- |
| **Inactive / Ghost** (Base, 일반 FS) | 채도 0%, 명도 30%, 흑요석 석상 질감. 표면에 미세한 균열, 균열 틈으로 아주 약한 바이올렛 빛 (opacity 15%) | 키라이트 없음, 림라이트만 20% | 3~5초 간격 균열 빛 1회 맥동 |
| **Awakening** (슈퍼 FS 진입 전환) | 균열 확장 → 석상 껍질 파편 폭발 → 실제 질감 노출 | 아래에서 위로 바이올렛 업라이트 폭발 | 2.5초 전환 시퀀스 (§4.4 참조) |
| **Awakened / Active** (슈퍼 FS) | 풀 컬러, 날개 전개, 영혼 불꽃 상시 | 키라이트 + 바이올렛 림 100% | 부유(Floating) 루프, 베일 2차 모션 |
| **Fission Cast** | 양손의 두 구체를 릴 쪽으로 밀어냄 | 구체 발광이 얼굴에 반사 | 1.2초 시전 모션 |

**포즈 시트 (발주 필수 5컷)**: 
- B-1 Ghost Idle
- B-2 Awakening Break
- B-3 Awakened Idle
- B-4 Fission Cast
- B-5 Super Win Blessing

### 2.3 캐릭터 원화 납품 규격
- **해상도**: 원화 4096 × 4096 PSD, 레이어 분리 (라인/베이스/명암/발광/이펙트)
- **턴어라운드**: 정면 / 3/4 / 측면 각 1장 (세트, 네프티스 각각)
- **컬러 칩**: 각 캐릭터 주요 재질 6색 이상 HEX 표기
- **표정 시트**: 각 캐릭터 4종 (중립 / 분노·엄숙 / 집중 / 승리)
- **크기 기준**: 1920 × 1080 가로 화면에서 캐릭터 높이 = 화면 높이의 75%, 세로 모드에서는 릴 상단 영역으로 흉상 크롭 배치

---

## 3. 심볼 9종 조명 규격 (Symbol Lighting Specification)

### 3.1 공통 라이팅 리그 (Master Lighting Rig)

모든 심볼은 **동일한 가상 라이팅 리그**에서 렌더링/생성되어야 한다.

| 광원 | 방향 | 색온도 / 색 | 강도 (상대값) | 역할 |
| :--- | :--- | :--- | :--- | :--- |
| **Key Light** | 우측 상단 45° (Top-Right 45°, 고도 45°) | 따뜻한 황금빛 약 3,800K / `#FFE3A3` | 1.00 | 주 형태 묘사, 골드 하이라이트 |
| **Fill Light** | 좌측 정면 -30° | 중성 그레이 / `#8A8FA3` | 0.25 | 그림자 내부 디테일 최소 보존 |
| **Rim Light** | 좌측 하단 + 외곽 전체 | 차가운 샌드 화이트 / `#F2E8D5` | 0.60 | 배경(`#121218`)과 강제 분리 |
| **Emissive** | 심볼 내부 | 심볼 고유색 | 심볼별 상이 | 보석 내부광, 루비 코어 |
| **Drop Shadow** | 우측 상단 광원의 반대편 (좌하단 4px) | `#000000` 60% | — | 릴 표면 위 부유감 |

**공통 수치 규격**
- **스펙큘러 하이라이트**: 키라이트 방향(우상단)에만 1~2개. 다중 하이라이트 금지.
- **최대 명도**: 일반 상태 심볼의 최고 명도 픽셀 ≤ 92% (윈 하이라이트 상태 100%를 위해 여유 확보).
- **배경 대비**: 심볼 평균 명도 ≥ 배경 명도 + 45%p.
- **캔버스**: 512 × 512, 패딩 10%, 중앙 정렬, 알파 채널.

### 3.2 심볼 상태별 조명 변화

| 상태 | 조명 변화 | 지속 시간 |
| :--- | :--- | :--- |
| **Normal** | 기본 리그 | 상시 |
| **Dimmed** (윈 중 비당첨 심볼) | 명도 -40%, 채도 -30%, 림라이트 OFF | 윈 연출 동안 |
| **Win Highlight** | 키라이트 1.0 → 1.4, 림라이트 Sunfire Gold `#FFD700`로 교체, 외곽 글로우 8px | 0.6초 |
| **Dissolve** | 이미시브 최대 → 모래 입자화 | 0.3초 |
| **Landing** | 착지 순간 스펙큘러 플래시 1회 | 0.08초 |

### 3.3 저배당 L1~L5 — 고대 이집트 각면 보석

공통: 보석 본체 + 얇은 앤션트 골드 베젤(테두리 두께 = 심볼 폭의 4%). **장식 없음.** 형태와 색만으로 0.3초 식별.

| 코드 | 심볼 | 형태 | 본체 색 | Emissive (내부광) | 스펙큘러 | 림라이트 | 식별 포인트 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **L1** | 루비 마름모 | 세로로 긴 마름모, 브릴리언트 컷 | `#C1121F` → 코어 `#FF4D5A` | 0.45, 중심 방사 | 우상단 패싯 강하게 | 샌드 화이트 0.6 | 가장 진한 빨강, 세로 실루엣 |
| **L2** | 자수정 육각형 | 정육각형, 테이블 컷 | `#7B2CBF` → 코어 `#C77DFF` | 0.40 | 우상단 + 테이블면 반사 | 0.6 | 육각 윤곽, 로열 바이올렛 |
| **L3** | 토파즈 역삼각형 | 역삼각형, 트릴리언트 컷 | `#E09F3E` → 코어 `#FFD166` | 0.50 (골드 베젤과 분리 위해 최대 밝기) | 상단 변 라인 하이라이트 | 0.7 | 역삼각 실루엣, 웜 앰버 |
| **L4** | 에메랄드 정방형 | 정사각형, 에메랄드 스텝 컷 | `#2D6A4F` → 코어 `#52B788` | 0.35 | 계단 패싯 2단 반사 | 0.6 | 사각 + 계단 줄무늬, 딥 그린 |
| **L5** | 사파이어 오각형 | 정오각형, 브릴리언트 컷 | `#1D3557` → 코어 `#4895EF` | 0.40 | 우상단 별 반짝임 (star glint) | 0.6 | 오각 실루엣, 딥 블루 |

### 3.4 고배당 H1~H4 — 세트 신화 렐릭

공통: 3D 금속 양각. 골드는 **Ancient Pharaoh Gold `#D4AF37` 베이스 + Sunfire Gold `#FFD700` 하이라이트 + 다크 브론즈 `#5C4515` 음각 그림자**의 3단 명암. 패딩 7% (보석 대비 면적 10% 큼).

| 코드 | 심볼 | 주 재질 | 키라이트 처리 | 림라이트 | Emissive 포인트 | 윈 상태 특수 연출 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **H1** | 세트 황금 마스크 | 폴리시드 골드 + 흑요석 안면 | 이마·주둥이에 강한 스펙큘러 | 1.0 (최강) | 두 눈 루비 `#E63946`, 강도 0.8 + 블룸 | 눈에서 크림슨 광선 2줄 발사 |
| **H2** | 암흑 앙크 십자가 | 흑요석 본체 + 골드 테두리 | 골드 테두리 상단 라인 하이라이트 | 0.8 | 중앙 크림슨 코어 0.7, 심장박동 맥동 | 코어 맥동 3배속 + 크림슨 링 웨이브 |
| **H3** | 코브라 우라에우스 왕관 | 골드 + 코브라 비늘 음각 | 목 후드 펼친 면에 넓은 하이라이트 | 0.8 | 코브라 눈 에메랄드 그린 `#52B788` 0.5 | 코브라가 고개를 내미는 0.3초 모션 |
| **H4** | 전신의 파괴 지팡이 | 다크 브론즈 자루 + 골드 머리 | 사선 배치, 머리 부분 집중 하이라이트 | 0.7 | 갈라진 끝 사이 크림슨 번개 0.6 | 갈라진 끝에서 번개 아크 방전 |

**렐릭 위계 조명 규칙**: H1 > H2 > H3 > H4 순으로 림라이트와 이미시브 강도를 단계적으로 낮추어 위계를 체감시킨다.

### 3.5 특수 심볼 조명 (Scatter / Multiplier)

| 심볼 | 조명 핵심 | Emissive | 비고 |
| :--- | :--- | :--- | :--- |
| **Scatter (황금 성갑충)** | 키라이트 1.2, 날개 끝 Sunfire Gold 림 | 등껍질 붉은 룬 보석 0.9 | 주변 모래폭풍 궤도 파티클 상시 |
| **Super Scatter (슈퍼 성갑충)** | 키라이트 1.3 + 하단 바이올렛 업라이트 | 룬 보석이 크림슨 + 바이올렛 이중 코어 | 실루엣 동일, 날개에 바이올렛 영혼 불꽃 |
| **Multiplier Orb (2x~8x)** | 자체 발광 위주, 키라이트 0.5 | 브론즈/앰버 회오리 0.8 | 티어 1 (Dune Sand) |
| **Multiplier Orb (10x~25x)** | 자체 발광 | 블루 플라즈마 1.0 + 전기 아크 2~3줄 | 티어 2 (Blue Thunder) |
| **Multiplier Orb (50x~100x)** | 자체 발광 | 바이올렛 혼돈 화염 1.2 | 티어 3 (Violet Chaos) |
| **Multiplier Orb (500x)** | 자체 발광 최대 | 크림슨 & 골드 슈퍼노바 1.5 + 번개 낙하 | 티어 4 (Supernova) |

---

## 4. 텀블 및 배수 복제 연출 스토리보드 (Storyboard)

### 4.1 Sequence 1 — 기본 텀블 1사이클 (Base Tumble Cycle)
- **T-1 릴 정지 (0~150ms)**: 6열 좌→우 순차 정지 (열 간 60ms). 심볼 착지 스펙큘러 플래시. 석판 '쿵'음.
- **T-2 당첨 판정 (150~250ms)**: 8개 이상 클러스터 심볼 확정. 비당첨 심볼 Dimmed (-40%). 저음 웅.
- **T-3 윈 하이라이트 (250~850ms)**: 당첨 심볼 골드 외곽 글로우 및 1.08배 살짝 확대. 림라이트 Sunfire Gold.
- **T-4 윈 금액 표시 (450~850ms)**: 클러스터 중심에 골드 베벨 숫자 팝업 후 페이드.
- **T-5 모래 소멸 (850~1150ms, 0.3초)**: 당첨 심볼이 Dune Sand Amber 모래 입자(60~80개)로 분해되며 흩날림.
- **T-6 낙하 (1150~1450ms)**: 상단 심볼이 중력 낙하 (착지 바운스 6px).
- **T-7 보충 (1300~1600ms)**: 화면 위에서 새 심볼 낙하 (T-6과 150ms 오버랩).
- **T-8 재판정 (1600ms~)**: 추가 당첨 시 T-2로 루프, 없으면 피니시 시퀀스로.

### 4.2 Sequence 2 — 배수 스텝업 (Grow-on-Tumble)
- **M-1 에너지 흡수 (0~300ms)**: 소멸하는 모래 입자 30%가 배수구로 흡입.
- **M-2 압축 (300~450ms)**: 배수구가 0.9배로 수축하며 발광 감소.
- **M-3 스텝업 팝 (450~650ms)**: 1.25배 팽창 후 복귀, 숫자 롤링 (`2x → 3x`), 링 쇼크웨이브.
- **M-4 티어 전환 (650~1150ms)**: 임계값 돌파 시 구체 재질 변환 (`8x → 10x` 앰버 → 블루 등).

### 4.3 Sequence 3 — 세트(Character A) 배수 복제 피니시 (Multiplier Cloner)
- **C-1 정적 (0~400ms)**: 텀블 종료 후 릴 0.3초 정지. 세트의 눈 크림슨 점등. BGM 덕킹 -12dB. *(기대감 형성 핵심)*
- **C-2 시선 고정 (400~900ms)**: 최고 배수구 1개에 크림슨 타깃 마커. 세트 Anticipation 포즈.
- **C-3 시전 (900~1400ms)**: 지팡이 끝에 크림슨 번개 응축, 루비 코어 맥동.
- **C-4 번개 발사 (1400~1600ms)**: 크림슨 번개가 타깃 배수구로 직격, 화면 플래시 및 흔들림.
- **C-5 복제 분리 (1600~2000ms)**: 타깃 배수구 옆으로 잔상(Ghost Copy)이 분리되어 생성.
- **C-6 비행 & 착지 (2000~2600ms)**: 복제 구체가 포물선 비행 후 착지 셀의 기존 심볼을 모래로 부수며 안착.
- **C-7 다중 복제 (해당 시)**: 2회차부터 50% 속도로 압축 반복.
- **C-8 배수 합산 (+1200ms)**: 릴 위 모든 배수구가 상단 배수바로 날아가 합산.
- **C-9 최종 곱셈 (+2000ms)**: 총 배수가 윈 카운터로 내려꽂히며 골드 코인 분수 폭발.

### 4.4 Sequence 4 — 슈퍼 프리스핀 진입 & 네프티스 각성 (Awakening)
- **N-1 슈퍼 스캐터 감지 (0~600ms)**: 바이올렛 빛기둥 + 세트 포효.
- **N-2 빛 전달 (600~1200ms)**: 빛기둥이 좌측 석상(네프티스)으로 흘러감.
- **N-3 균열 확장 (1200~2000ms)**: 석상 전신에 균열 확산, 바이올렛 발광 15% → 100%.
- **N-4 석상 파쇄 (2000~2500ms)**: 석상 파편 폭발, 네프티스 각성 본체 노출, 날개 전개.
- **N-5 보너스 패널 언락 (2500~3300ms)**: 릴 상단 [Main] + [Bonus] 듀얼 배수 패널 석문 오픈.
- **N-6 타이틀 (3300~4500ms)**: "SUPER FREE SPINS / 超級免費遊戲" 타이틀 노출.

### 4.5 Sequence 5 — 네프티스 심볼 분열 & 듀얼 패널 적립 (Symbol Fission)
- **F-1 시전 (0~500ms)**: 네프티스가 양손 구체를 릴로 밀어냄.
- **F-2 공명 (500~800ms)**: 타깃 배수구 진동.
- **F-3 분열 (800~1200ms)**: 한 셀 안에서 배수구가 **좌(골드 디자인) / 우(바이올렛 디자인)**로 분열.
- **F-4 비행 (1200~1800ms)**: 골드 배수 → 좌상단 Main Panel, 바이올렛 배수 → 우상단 Bonus Panel로 비행.
- **F-5 적립 (1800~2200ms)**: 각 패널 수치 누적 롤링.

---

## 5. AI 생성 프롬프트 (AI Generation Prompts)

### 5.1 생성 파이프라인 설정
- **기본 모델**: `gpt-image` (폴백: `dall-e-3`)
- **Master Positive Anchor**:
  `3D semi-realistic mobile slot game icon, themed around ancient Egyptian storm god Seth, crafted from dark obsidian stone and ornate polished ancient gold metalwork, embedded with glowing crimson ruby accents, dramatic rim lighting from top right, sharp clean edges, studio octane render, Unreal Engine 5 asset, centered isometric view, isolated on pure black background, 8k resolution, crisp textures, professional iGaming asset`
- **Master Negative Anchor**:
  `2d flat, cartoon illustration, sketch, blurry, noisy background, photorealistic human faces, oversaturated bright colors, watermark, signature, messy borders, cropped, low quality render, plastic toy texture, anime style`
- **Lighting Rig Anchor**:
  `single warm golden key light from top-right at 45 degrees, thin cool sand-white rim light along the bottom-left edges, soft neutral fill, one sharp specular highlight on the upper-right facet, subtle drop shadow to the lower-left, consistent lighting across a symbol set`

### 5.2 심볼별 핵심 생성 프롬프트

- **L1 Ruby**: `a single vertically elongated rhombus-shaped ruby gemstone with brilliant cut facets, deep crimson body with a glowing bright red inner core, framed by a thin dark ancient gold bezel, minimal ornament, instantly readable shape, [Lighting Rig Anchor], [Master Positive Anchor]`
- **L2 Amethyst**: `a single regular hexagon-shaped amethyst gemstone with a flat table cut, rich royal purple body with a soft lavender inner glow, framed by a thin ancient gold bezel, minimal ornament, clean geometric silhouette, [Lighting Rig Anchor], [Master Positive Anchor]`
- **L3 Topaz**: `a single inverted triangle-shaped topaz gemstone pointing downward with trillion cut facets, warm orange-yellow body with the brightest golden inner glow, framed by a thin darker bronze-gold bezel for contrast, bright highlight line along the top edge, minimal ornament, [Lighting Rig Anchor], [Master Positive Anchor]`
- **L4 Emerald**: `a single square-shaped emerald gemstone with emerald step cut showing stepped parallel facets, deep forest green body with a jade green inner glow, framed by a thin ancient gold bezel, minimal ornament, crisp square silhouette, [Lighting Rig Anchor], [Master Positive Anchor]`
- **L5 Sapphire**: `a single regular pentagon-shaped sapphire gemstone with brilliant cut facets, deep navy blue body with a bright azure inner glow, small star glint on the upper-right corner, framed by a thin ancient gold bezel, minimal ornament, [Lighting Rig Anchor], [Master Positive Anchor]`
- **H1 Golden Mask of Seth**: `a majestic golden ceremonial mask of the Egyptian god Seth, long curved snout and tall squared-off upright ears, polished ancient gold with deep engraved hieroglyph relief and dark bronze recesses, obsidian black inlays, two glowing crimson ruby eyes with strong bloom, the most luxurious and powerful relic, strong rim light, front three-quarter view, [Lighting Rig Anchor], [Master Positive Anchor]`
- **H2 Dark Ankh**: `an ancient Egyptian ankh cross carved from glossy black obsidian, edged with ornate polished gold trim, a large blood-red crimson gemstone core embedded at the center of the cross glowing like a heartbeat, engraved hieroglyph details on the gold trim, upright centered composition, [Lighting Rig Anchor], [Master Positive Anchor]`
- **H3 Cobra Uraeus**: `an ancient Egyptian royal circlet crown with a rearing golden cobra uraeus in attack pose, hood fully flared, finely engraved gold scales, small glowing emerald green eyes, dark bronze shadow recesses between the scales, regal and menacing, front three-quarter view, [Lighting Rig Anchor], [Master Positive Anchor]`
- **H4 Was Scepter**: `an ancient Egyptian was scepter placed diagonally from upper-right to lower-left, dark bronze shaft wrapped with worn crimson cloth at the grip, ornate golden animal head at the top, sharply forked bottom end with crimson lightning arcing between the prongs, ritual weapon of the storm god, [Lighting Rig Anchor], [Master Positive Anchor]`

---

## 6. 납품 체크리스트 (Delivery Checklist)

- [ ] 심볼 9종 (L1~L5, H1~H4) × 상태 4종 (Normal / Dimmed / Win / Dissolve 시퀀스)
- [ ] 스캐터 2종 (일반 / 슈퍼), 배수구 4티어 + 중간값 예고 림 버전
- [ ] 세트 포즈 6컷 + 네프티스 포즈 5컷 + 턴어라운드 + 표정 시트
- [ ] Spine 파츠 분리 PSD (발광 레이어 Additive 분리)
- [ ] 배경 3종 (Base / FS / Super FS) + 패럴랙스 레이어 분리
- [ ] 릴 프레임, 듀얼 배수 패널 (Main / Bonus), 윈 등급 타이틀 3종 (한자 병기: 大獎 / 巨獎 / 超級大獎)
- [ ] VFX: 모래 소멸(0.3s), 스텝업 쇼크웨이브, 크림슨 번개, 복제 트레일, 석상 파쇄, 분열 섬광
- [ ] 64px 흑백 실루엣 식별 테스트 통과 기록
- [ ] 통합 LUT 적용 확인 (전 에셋 동일 톤)
