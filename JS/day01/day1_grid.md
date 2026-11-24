# Day08 · CSS Grid 정리

> 수업 실습 `grid.html`을 정리하고, 아인즈 이력서 페이지에 서번트 grid를 붙여 본 기록

## 1. 실습 코드 (grid.html)

```html
<style>
  #container {
    border: 2px solid dodgerblue;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 80px;
    gap: 10px;
  }

  .item {
    border: 1px solid black;
  }
</style>

<div id="container">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
  <div class="item">D</div>
  <div class="item">E</div>
  <div class="item">F</div>
</div>
```

### 결과 모양

```
┌──────────┬──────────┐
│    A     │    B     │  80px
├──────────┼──────────┤
│    C     │    D     │  80px
├──────────┼──────────┤
│    E     │    F     │  80px
└──────────┴──────────┘
  (칸 사이 간격 10px)
```

## 2. 줄마다 설명

| 코드 | 뜻 |
|---|---|
| `display: grid;` | 이 상자를 **바둑판(grid) 컨테이너**로 만든다. 직계 자식(.item)들이 칸에 하나씩 들어감 |
| `grid-template-columns: repeat(2, 1fr);` | **열을 2개**, 비율 1:1로 나눈다. `1fr 1fr`을 줄여 쓴 것 |
| `grid-auto-rows: 80px;` | 행은 **개수를 정하지 않고** 아이템 수만큼 자동으로 생기게 하고, 높이만 80px로 |
| `gap: 10px;` | 칸 사이 간격 (바깥 테두리 쪽엔 안 생김) |

- 아이템 6개 ÷ 2열 = **3행이 자동으로** 생김. 아이템을 8개로 늘리면 4행이 됨
- `fr` = fraction(몫). **gap을 빼고 남은 공간**을 비율대로 나눠서 `%`보다 편함 (`50% 50%` + gap 10px이면 10px 넘침)

## 3. template-rows vs auto-rows

| | `grid-template-rows` | `grid-auto-rows` |
|---|---|---|
| 행 개수 | **내가 정함** (`repeat(3, 80px)` = 딱 3행) | **아이템 수에 맞춰 자동** |
| 언제 | 레이아웃이 고정일 때 (Grid Garden처럼) | 카드 목록처럼 개수가 늘어날 때 |

→ 서번트 카드처럼 나중에 더 추가될 수 있는 목록은 `auto-rows`가 편하다.

## 4. 선 번호 (오늘 Grid Garden에서 막힌 곳)

```
칸 5개 = 선 6개
선:  1   2   3   4   5   6
     | 1 | 2 | 3 | 4 | 5 |
```

```css
grid-column: 2 / 6;        /* 선 2~6 = 2~5번 칸 */
grid-column: 2 / span 4;   /* 2번 선에서 4칸 */
grid-column: span 4 / 6;   /* 6번 선에서 거꾸로 4칸 */
grid-column: 1 / -1;       /* -1 = 마지막 선 → 처음부터 끝까지 */
```

- 그냥 숫자 = **선 번호**, `span 숫자` = **칸 개수**
- 자주 하는 실수: `2 / 5`라고 쓰면 4번 칸까지만 (한 칸 모자람)

## 5. 응용: 아인즈 페이지에 서번트 grid 추가

파일: `ainz.html`, `ainz_style.css`, `servants/*.html` (계층수호자 8명)

```css
.servant-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);   /* 넓은 화면 4열 */
    grid-auto-rows: 240px;
    gap: 12px;
}

@media (max-width: 768px) {
    .servant-grid {
        grid-template-columns: repeat(2, 1fr);   /* 좁은 화면 2열 = grid.html과 같은 모양 */
        grid-auto-rows: 200px;
    }
}
```

- 카드 하나 = `<a class="servant-card albedo" href="servants/albedo.html">` → 카드 전체가 링크
- 기본은 회색, 호버하면 각자 색: 수호자마다 `--c` 변수만 다르게 주고 `:hover`에서 `var(--c)`를 꺼내 씀
- 이미지는 `<img>`를 넣으면 `grayscale(100%)` 흑백 → 호버 시 `grayscale(0)` 컬러로

| 수호자 | 담당 | 호버 색 |
|---|---|---|
| 알베도 | 수호자 총괄 | `#d9ccff` |
| 샤르티아 블러드폴른 | 제1~3계층 | `#e0245e` |
| 가르간투아 | 제4계층 | `#a1887f` |
| 코퀴토스 | 제5계층 | `#4fc3f7` |
| 아우라 벨라 피오라 | 제6계층 | `#ff8a50` |
| 마레 벨로 피오레 | 제6계층 | `#7ccf6b` |
| 데미우르고스 | 제7계층 | `#ff3d00` |
| 빅팀 | 제8계층 | `#f48fb1` |

## 6. 테마 변경 (다크)

색을 `:root` 변수로 모아 둬서 **변수 값만 바꿔서** 전체 테마를 바꿨다.

| 변수 | 전 (라이트) | 후 (다크) |
|---|---|---|
| 배경 `--bg` | `#f2f2f2` 회색 | `#000` 검정 |
| 글자 `--text` | `#2b2b2b` | `#fff` |
| 강조 `--accent` | `#ff7f61` 코랄 | `#ffd400` 노랑 |

- 노란 배경 위 글자는 흰색이 아니라 **검정**이 잘 읽힘 (사이드바 호버, 프로필 아이콘)

## 7. 막힌 곳 / 복습

| 막힌 곳 | 내일 물어볼 질문 | 복습 |
|---|---|---|
| grid 숫자가 칸이 아니라 선 번호 | 칸 5개일 때 `span 2 / -1`은 몇~몇 번 칸? | 11/25 · 11/27 · 12/1 |
| template-rows vs auto-rows | 아이템 7개, `repeat(2,1fr)` + `auto-rows`면 몇 행? | 11/25 · 11/27 · 12/1 |

출처: 나무위키 '나자릭 지하대분묘' 문서 (수호자 목록)
