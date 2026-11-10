# [Project Seth] 대만 타겟 슬롯 아트 디렉팅 가이드라인 (Art Bible)

- **문서 버전**: v1.0
- **기획/AD 파트너**: 메지 & 현상엽 (Yeob)
- **타겟 시장**: 대만 (Taiwan) 소셜 카지노
- **핵심 벤치마크**: ATG 戰神賽特 (Storm of Seth), Pragmatic Play Gates of Olympus
- **핵심 테마**: 이집트 혼돈과 모래폭풍의 신 '세트(Seth)' & 고대 암흑 신전

---

## 1. 아트 디렉션 핵심 기조 (Visual Tone & Manner)

### "Dark Obsidian, Gleaming Gold & Crimson Storm"
- **조잡함 방지의 제1원칙**: 배경은 빛을 흡수하고(Low Key), 심볼은 금속 질감과 림라이트로 분리하며, 특수 이펙트(배수구/스캐터)만 고채도로 폭발시킨다.
- **스타일 규격**: 2.5D ~ 3D 세미 리얼리스틱 렌더 (옥테인 렌더/언리얼 엔진 5 질감). 플랫한 2D 카툰을 지양하고, 대만 유저가 선호하는 묵직하고 값비싼 '골드 메탈릭' 양각 질감을 극대화.

---

## 2. 통합 컬러 팔레트 & 조명 규칙 (Color & Lighting)

### 2.1 Color Palette
| 구분 | 명칭 | 헥스코드 | 용도 |
| :--- | :--- | :--- | :--- |
| **Base Dark** | Obsidian Slate | `#121218` | 릴 배경판, 섀도우, 빛 흡수 영역 |
| **Primary Gold**| Ancient Pharaoh Gold | `#D4AF37` | 릴 프레임 테두리, 고배당 심볼 양각, UI 골드 |
| **Highlight Gold**| Sunfire Gold | `#FFD700` | 림라이트, 당첨 하이라이트 |
| **Accent Red** | Seth Crimson Flame | `#E63946` | 세트 안광, 번개 배수구, 스캐터 루비 핵 |
| **Atmosphere** | Dune Sand Amber | `#A67C38` | 배경 모래바람, 파티클, 릴 분할선 |

### 2.2 Lighting & Angle Standards
- **Key Light (주광원)**: 우측 상단 45도 (Top-Right 45°). 따뜻한 황금빛 태양광.
- **Rim Light (외곽선광)**: 좌측 하단 및 심볼 테두리 전체에 들어가는 얇고 차가운 화이트/샌드 글로우 (심볼이 배경에 묻히지 않도록 강제 분리).
- **Depth (원근감)**: 심볼 바로 뒤에 미세한 드롭 섀도우(Drop Shadow, `#000000` 60% opacity)를 배치하여 릴 표면에서 살짝 떠 있는 입체감 부여.

---

## 3. 심볼 시각적 위계 체계 (Symbol Hierarchy)

```
[최상위] Multiplier Orb (화염/번개 구체) & Scatter (황금 성갑충) -> 최대 채도, 발광, 동적 파티클
   ↑
[고배당] Seth High-Pay Relics (마스크, 앙크, 코브라, 지팡이) -> 묵직한 3D 금속 양각, 높은 대비
   ↑
[저배당] Gemstones (루비, 사파이어, 에메랄드, 토파즈, 자수정) -> 단정하고 날카로운 단색 각면 보석
   ↑
[바닥]   Reel Background (흑요석 암흑 석판) -> 저명도/저채도로 심볼 가독성 100% 보장
```

### 3.1 Low-Pay Symbols: 고대 이집트 각면 보석 5종
- **설계 의도**: 0.3초 스캔 시 색상과 형태가 즉각 구분되어야 함. 장식 요소를 덜어내고 순수한 보석 컷팅에 집중.
- **L1 (Red)**: 루비 마름모 (Ruby Rhombus)
- **L2 (Purple)**: 자수정 육각형 (Amethyst Hexagon)
- **L3 (Yellow)**: 토파즈 역삼각형 (Topaz Inverted Triangle)
- **L4 (Green)**: 에메랄드 정방형 (Emerald Square)
- **L5 (Blue)**: 사파이어 오각형 (Sapphire Pentagon)

### 3.2 High-Pay Symbols: 세트 신화 렐릭 4종
- **설계 의도**: 대만 유저의 '일확천금' 심리를 자극하는 묵직하고 디테일한 황금 보물.
- **H1 (Top High)**: **세트 황금 마스크 (Golden Mask of Seth)** — 붉은 루비 안광과 날렵한 자칼 귀가 달린 파라오급 마스크.
- **H2**: **암흑 앙크 십자가 (Dark Ankh with Crimson Core)** — 중앙에 핏빛 보석이 박힌 황금 앙크.
- **H3**: **코브라 우라에우스 왕관 (Cobra Uraeus Circlet)** — 공격 태세를 취한 황금 코브라.
- **H4**: **전신의 파괴 지팡이 (Seth's Was Scepter)** — 끝이 날카롭게 갈라진 의식용 전투 지팡이.

### 3.3 Special Symbols
- **Scatter (스캐터 - 성갑충 Scarab)**:
  - 활짝 펼친 황금 날개, 등껍질 중앙에 신성한 붉은 룬 보석, 주변을 맴도는 모래폭풍 궤도.
  - 4개 이상 등장 시 화면 전체가 암전되며 세트의 포효 연출.
- **Multiplier Orbs (배수구 - 영혼의 불꽃 구체)**:
  - `2x ~ 8x`: 브론즈/앰버 모래 회오리 구체
  - `10x ~ 25x`: 블루 썬더 플라즈마 구체
  - `50x ~ 100x`: 바이올렛/퍼플 혼돈 화염 구체
  - `500x`: 크림슨 레드 & 골드 슈퍼노바 구체 (화면 진동 및 붉은 번개 낙하)

---

## 4. AI 이미지 생성용 마스터 프롬프트 앵커 (Prompt Anchor)

AI로 리소스를 생성할 때 스타일 분절을 막기 위해 **모든 프롬프트에 공통 삽입할 앵커 텍스트**입니다.

### 4.1 Master Positive Prompt Anchor
```text
3D semi-realistic mobile slot game icon, themed around ancient Egyptian storm god Seth, crafted from dark obsidian stone and ornate polished ancient gold metalwork, embedded with glowing crimson ruby accents, dramatic rim lighting from top right, sharp clean edges, studio octane render, Unreal Engine 5 asset, centered isometric view, isolated on pure black background, 8k resolution, crisp textures, professional iGaming asset
```

### 4.2 Master Negative Prompt Anchor
```text
2d flat, cartoon illustration, sketch, blurry, noisy background, photorealistic human faces, oversaturated bright colors, watermark, signature, messy borders, cropped, low quality render, plastic toy texture, anime style
```

---

## 5. 실기 적용 및 후가공(Post-Processing) 파이프라인

1. **배경 누끼 & 알파 채널**: Pure Black(`rgb(0,0,0)`) 배경에서 생성 후 완벽한 알파 추출.
2. **컬러 그레이딩(LUT 통합)**: 생성된 모든 PNG 에셋을 통합 LUT(Warm Gold & Dark Contrast)에 통과시켜 채도와 톤을 100% 일치시킴.
3. **스프라이트 시트 규격화**: 256x256 / 512x512 고정 해상도로 캔버스 중앙 정렬 및 여백(Padding 10%) 통일.
