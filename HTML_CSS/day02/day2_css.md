# Day06 정리: POST 폼 · label · Semantic · CSS 기초 · 박스 모델

> 노션 "Day06" 정리를 옮겨 적은 파일 (2026-11-20 수업). 노션 캡처 이미지는 md로 옮겨지지 않아서 빠져 있음.
> `✅ 보완`이 붙은 부분은 메모에서 틀리거나 빠진 내용을 채운 것.

어제는 HTML 태그, 폼까지 배움.

---

# Part 1. HTTP 복습 & 회원가입 (POST)

## HTTP 요청의 필수 요소 2개

- **Method + URL**
  - Method : 행위, 동작
  - URL : 자원(리소스)

## 데이터 보낼 때

- **Query String(parameter)** : `?key=value` → 조회에 씀!
- **Create (POST)** : **Body(요청 본문)** 에 담아서 보낸다.
- 요청 메시지와 응답 메시지, 두 개의 메시지 구조는 똑같음 (시작 줄 + 헤더 + 본문)
  - 응답 메시지 맨 윗줄의 `200 OK`는 응답이라서 있는 거!
  - 응답을 받아서 HTML(화면을 그리는 언어)을 보여 줌

회원가입이면 email, password를 Body에 담아 보냄.

> ✅ 보완: HTML `<form method="post">`는 기본적으로 JSON이 아니라 `email=a%40b.com&password=1234` 같은 **폼 형식**으로 Body에 담아 보냄 (httpbin 결과의 `"form"` 칸). JSON(`{"key": "value"}`)은 나중에 JavaScript나 API로 보낼 때 주로 씀

## 회원가입 흐름

회원가입 = 회원 정보를 미리 등록(저장)해 놓는 것

1. 본인인증 같은 거 하고 (내 정보 입력)
2. 회원가입 버튼 누르기

카카오톡도 같은 흐름이다 → 메시지 작성하고 전송 버튼 누르고

- 클라이언트 : **브라우저도 클라이언트임**
- HTTP 규칙에 맞게 클라이언트와 서버가 메시지를 주고받음

## form + POST

```html
<form action="https://httpbin.org/post" method="post">
    <input type="text" placeholder="Username" name="username" autofocus autocomplete="off">
    <button>전송</button>
</form>
```

| | GET (Day05) | POST (오늘) |
|---|---|---|
| CRUD | Read (조회) | **Create (생성)** |
| 데이터 위치 | URL 뒤 `?key=value` (Query) | 요청 **Body** 안 |
| 주소창에 보임? | 보임 | 안 보임 |
| 예 | 검색 | 회원가입, 글쓰기, 로그인 |

- httpbin.org/post = 내가 보낸 요청을 **그대로 되돌려 보여 주는 연습용 서버**. 결과의 `"form"` 칸에 `username`이 들어 있으면 Body로 잘 간 것
- ⚠️ POST라고 **암호화되는 건 아님**. 주소창에 안 보일 뿐, 보안은 HTTPS가 담당 (Day02)

---

# Part 2. label과 id

Label 태그를 만들면 for를 넣어 줘야 함. for에다가 어떻게 이 이름을 알려 주느냐? → 각각의 태그들에게 **id(식별자)** 를 지정(부여)할 수 있음.

```html
<label for="query">검색어</label>
<input id="query" type="search" name="q">
```

이렇게 하면 "검색어" 글자를 클릭했을 때 검색창에 노란(파란) 테두리가 쳐지면서 바로 검색어를 입력하게 됨.

**Moon 선생님 정리 참고**

- 인풋 태그를 라벨로 연결하면, 웹에서 라벨을 클릭할 때 그 인풋의 입력창으로 자동으로 이동할 수 있다
- 라벨이 어떤 입력창(어떤 인풋)에 연결될지 지정해 주는 게 `for` 속성이고, `for=""`에는 미리 정의해 둔 인풋의 아이디를 넣는다

```html
<label for="email">이메일 주소:</label>
<input id="email" type="email">
```

→ 웹에서 [이메일 주소]를 클릭하면 실제 이메일 주소를 입력하는 창으로 자동으로 이동됨

- **for 값이랑 id 값이 한 글자라도 다르면 연결이 안 됨** (대소문자 포함)

> ✅ 보완: label 한 줄 정리 → `for`와 `id`는 **짝꿍 번호표**. 사물함(input)에 번호(id)를 붙이고, 이름표(label)에 "이건 몇 번 사물함 거"(for)라고 적는 것
> - 연결하면 ① 글자를 눌러도 입력칸이 선택됨(focus) ② 스크린리더가 "이메일 주소, 입력란"이라고 읽어 줌 (img의 alt랑 같은 목적)
> - "반드시 for"는 정확히는 "**연결하고 싶으면**". 아니면 `<label>검색어 <input></label>`처럼 **감싸기**도 됨
> - id는 보통 영어 소문자 + 하이픈(`email-input`)으로. 띄어쓰기 금지

## id vs class vs name

| | id | class | name |
|---|---|---|---|
| 개수 | 한 페이지에 **딱 1개** (주민번호) | **여러 요소**에 반복 사용 (반 이름) | form 안에서 사용 |
| 누가 씀 | label, CSS(`#id`), JS | CSS(`.class`) | **서버로 보낼 때 key** (`?q=`) |
| 여러 개 붙이기 | 불가 | `class="a b"` 띄어쓰기로 가능 | - |

```html
<!-- ❌ 잘못된 예: 같은 id 두 번 -->
<div id="header"></div>
<p id="header"></p>
```

## 회원가입 폼 + 입력 검사

```html
<form>
    <label for="email">Email</label>
    <input id="email" type="email" required placeholder="example@email.com">
    <br>
    <label for="phone">Phone</label>
    <input id="phone" type="text" required
           placeholder="010-1234-5678"
           pattern="010-[0-9]{4}-[0-9]{4}"
           title="010-1234-5678 형식으로 입력하세요">
    <br>
    <button type="submit">Submit</button>
</form>
```

| 속성 | 하는 일 |
|---|---|
| `required` | 비워 두면 제출 안 됨 |
| `type="email"` | `@` 없는 값이면 제출 안 됨 |
| `pattern` | **정규식** 형식에 맞아야 제출됨 |
| `title` | pattern이 틀렸을 때 보여 줄 안내 문구 |

### 정규식(regex) 기초

| 기호 | 뜻 | 기호 | 뜻 |
|---|---|---|---|
| `.` | 아무 문자 1개 | `[0-9]` | 0~9 중 하나 (= `\d`) |
| `*` | 0번 이상 | `[]` | 문자 집합 (괄호 안 중 하나) |
| `+` | 1번 이상 | `^` | 시작 |
| `?` | 0 또는 1번 | `$` | 끝 |
| `{n}` | n번 반복 | | |

`010-[0-9]{4}-[0-9]{4}` = "010-" + 숫자 4개 + "-" + 숫자 4개

> ⚠️ 브라우저 검사는 **편의 기능일 뿐**. 사용자가 개발자 도구로 지울 수 있어서 **서버에서도 반드시 다시 검사**해야 함

---

# Part 3. Semantic

- 하나의 화면을 한 가지 방식으로만 구현하진 않음. 다른 방식으로도 같은 화면을 만들 수 있음! HTML에 강제 규칙이 있는 건 아님

### Division → `<div>`

- 시각적인 효과는 딱히 없는데 **그룹으로 묶는** 것
- CSS를 활용하면 할 수 있는 게 더 많음
- 그러다 보면 모든 걸 div로 만들려는 함정에 빠진다
- 근데 이러면 문제가 뭐냐면, **읽을 수가 없다** → 의미가 모호해진다
- 그래서 HTML은 **Semantic하게** 사용해야 한다는 게 국룰임

> ✅ 보완: div만 쓰면 **사람, 검색엔진, 스크린리더**가 어디가 머리말이고 어디가 본문인지 모름. 태그 이름 자체가 역할을 말해 주는 게 Semantic
> - `header`(상단) / `nav`(메뉴) / `main`(핵심 내용) / `section`(주제 묶음) / `article`(독립된 글) / `footer`(하단 정보)
> - div는 **의미 없는 순수 묶음**이 필요할 때만!

---

# Part 4. CSS (Cascading Style Sheets)

- HTML 요소의 **모양과 배치**를 정하는 언어
- CSS가 없으면 HTML은 흰 바탕에 검은 글씨만 있는 화면인데, 여기에 CSS를 활용해 HTML을 꾸민다
- **CSS를 배우지만 반드시 HTML이 같이 있어야 함** → CSS는 HTML을 꾸미는 것이기 때문!

CSS로 할 수 있는 것:

- 글자 색, 크기, 폰트
- 여백, 정렬, 위치
- 레이아웃 (Flex, Grid) → 화면에 요소를 어떻게 배치할지, 2단, 3단 가능
- 반응형 디자인 → 화면 크기에 따라 레이아웃이 자동으로 바뀌는 디자인

## 상속과 오버라이딩

- Parent에 색상을 입히면 Child에 따로 지정해 주지 않는 이상 그대로 내려간다 (예: `color: blue`)
- **오버라이딩(Overriding)** : Parent와 다른 설정을 자식에게 따로 부여하는 것
- 3대째 손두부 집의 가업을 잇지 않고 공무원을 하는 게 overriding이라 할 수 있다 😂

> ✅ 보완: 엄밀히는 두 개념이 달라!
> - **상속(Inheritance)** = 부모 값이 자식에게 내려가는 것. color, font 같은 **글자 관련 속성만** 내려가고, margin, border, padding은 상속 안 됨
> - **Cascading** = 여러 규칙이 겹칠 때 **우선순위로 최종 값을 정하는 폭포수 규칙** (아래 우선순위 참고)
> - 손두부 비유는 상속 + 오버라이딩 설명으로 딱이야 👍

## CSS 넣는 3가지 방법

### 1) 인라인(Inline) CSS

VS Code에서 `p*3` + Tab 하면 `<p>` 세 개가 생김

```html
<p style="font-size: x-large; font-weight: bold;">정재영</p>
<p style="font-size: medium;">개발자 지망생</p>
<p style="font-size: xx-small;">Copyright &copy; 정재영</p>
```

- `style` 안에 `속성: 값;` 형태의 property를 여러 개 넣을 수 있음. `;`는 "한 문장(설정 하나) 끝"
- `text-align: center`를 매번 작성, 수정하기는 너무 귀찮음 → **부모 태그에 적용**해 주면 되겠지? → 이럴 때 쓰는 게 `<div>`

```html
<div style="text-align: center;">
    <p>...</p>
    <p>...</p>
</div>
```

- 이때 footer만 우측 정렬하고 싶으면? → footer에 `text-align: right`를 줘서 예외 처리 (= 오버라이딩)
- 시멘틱하게 바꿔 주기: `p` 대신 `header`, `main`, `footer`
- 인라인 CSS는 나중에 속성을 10개 이상 넣기도 하는데, **가독성이 너무 떨어짐**

### 2) 인터널(Internal) CSS

`<head>` 안에 `<style>` 태그를 넣음

```html
<head>
    <style>
        div { text-align: center; }
        header { font-size: x-large; font-weight: bold; }
        main { font-size: medium; }
        footer { font-size: xx-small; }
    </style>
</head>
```

- 태그 이름을 적는 부분(`div`, `header`, `main`)을 **셀렉터(선택자)** 라고 함

> ✅ 보완: 태그 선택자(`p { }`)는 페이지의 **모든 p에 한꺼번에** 적용돼서 p 하나만 다르게 꾸미기가 어려움. 그래서 딱 하나는 **id**(`#이름`), 여러 개를 같은 스타일로 묶을 땐 **class**(`.이름`)를 씀. 실무에선 class를 제일 많이 씀

### 3) 익스터널(External) CSS

별도의 `.css` 파일을 만들고 `<link>`로 연결

```html
<link rel="stylesheet" href="style.css">
```

- 로컬 파일도 가능, 인터넷에 있는 것(CDN)도 가능

| 방법 | 위치 | 장점 | 단점 |
|---|---|---|---|
| **Inline** | 태그 안 `style=""` | 바로 확인 | 가독성 최악, 재사용 불가 |
| **Internal** | `<head>` 안 `<style>` | 한 파일에서 모아 관리 | 그 페이지에서만 사용 |
| **External** | 별도 `.css` 파일 + `<link>` | **여러 페이지가 같이 씀**, 실무 표준 | 파일이 하나 더 생김 |

## CSS 문법

```css
선택자 {
    속성: 값;
}

#content {
    color: red;
}
```

= "**선택자** 조건을 만족하는 태그를 찾아서, **속성**을 **값**으로 바꿔라"

## 선택자 총정리

| 종류 | 예시 | 고르는 대상 |
|---|---|---|
| 전체 | `*` | 모든 요소 |
| 태그 | `div` | 모든 div |
| 클래스 | `.text` | class="text" 전부 (같은 값을 여러 대상에게) |
| ID | `#header` | id="header" 하나 |
| 자손 (띄어쓰기) | `plate apple` | plate 안의 모든 apple (plate 안에 basket이 있고 그 안에 apple이 있어도 가능) |
| 자식 (`>`) | `plate > apple` | plate **바로 안에** 있는 apple만 |
| 인접 형제 (`+`) | `div + p` | div **바로 다음** p 하나 |
| 일반 형제 (`~`) | `div ~ p` | div 뒤에 오는 모든 형제 p |
| 속성 | `a[href]`, `input[type="text"]` | 해당 속성을 가진 요소 |
| 가상 클래스 | `:hover`, `:focus`, `:active`, `:nth-child(2)` | **상태**나 순서 기준 |

연습 사이트: **CSS Diner** (https://flukeout.github.io/) → 수업에서 한 plate/apple 게임!

> ✅ 보완: 노션 메모에서 plate/apple 예시가 "속성 셀렉터" 제목 밑에 있었는데, 사실은 **결합자(관계) 셀렉터** 내용이야

## 우선순위 (충돌이 났을 때의 규칙)

같은 요소에 여러 규칙이 겹치면 충돌이 발생 → 규칙이 필요함! **구체적인(그 요소와 직접 연관된) 선택자일수록 우선순위가 높음**

1. `!important` → 다 무시하고 "내가 하늘에 서겠다" 😂 무조건 맨 앞으로 치고 옴 (남발하면 나중에 아무도 못 고침)
2. inline style (`style=""`) → 구체적이다 못해 그냥 **물아일체**
3. id (`#id`) → 얘만 고르니까 연관도가 높음
4. class / 속성 / 가상 클래스 (`.class`, `[type]`, `:hover`)
5. 태그 (`div`, `p`)
6. 전체 (`*`) → 전체니까 우선순위 제일 낮음

> ✅ **id > class > tag**. 점수가 다르면 순서 상관없이 높은 쪽이 이기지만, 점수가 **같으면 나중에 쓴 코드가 이김!**

## emmet 단축키

- `a#link` + Tab → `<a href="" id="link"></a>`
- `#box` + Tab → 태그 이름을 안 쓰면 기본은 div → `<div id="box"></div>`
- `.card` + Tab → `<div class="card"></div>`
- `p*3` + Tab → `<p></p>` 3개

---

# Part 5. CSS 박스 모델

모든 HTML 요소를 **사각형 박스**로 보고 크기와 여백을 계산하는 규칙. 박스로 만들어서 쌓는다고 봅시다.

네 가지 요소로 구성 (안쪽부터): **content → padding → border → margin**

| 요소 | 뜻 |
|---|---|
| content | 글씨가 있는 영역 (내용) |
| padding | **내부 여백** (content ↔ border 사이) |
| border | content를 감싸고 있는 테두리. 보이게 할 수도 안 보이게 할 수도 있음 |
| margin | 내 border **바깥쪽** 여백 (다른 박스와의 간격) |

> 📦 **택배 상자 비유**
> - content = 상자 안의 **물건** (글자, 이미지)
> - padding = 물건을 감싼 **뽁뽁이** (안쪽 여백)
> - border = **상자 벽** (테두리)
> - margin = 상자끼리 **띄워 놓은 간격** (바깥 여백)
>
> 뽁뽁이(padding)를 늘리면 상자가 **안에서부터** 커지고, 간격(margin)을 늘리면 상자는 그대로인데 **옆 상자랑 멀어져**

> ✅ 보완: 메모에 "마진이 안쪽, 패딩이 바깥쪽 (?)"이라고 적었는데 **반대야!** padding = 안쪽, margin = 바깥쪽

### 기본값

- 대부분의 요소는 margin, padding, border가 0이고, border의 기본 모양은 `none`이라서 안 보임

> ✅ 보완: **대부분**은 0인데 태그마다 브라우저 기본값이 있는 애들이 있어!
> - `body`는 margin 8px, `p`/`h1`은 위아래 margin
> - `ul`/`ol`은 왼쪽 padding 40px (그래서 목록이 들여쓰기 돼 있음)
> - `button`/`input`은 border와 padding이 있음
> - 그래서 많이들 `* { margin: 0; padding: 0; }`로 초기화(리셋)하고 시작함

### 크기와 위치

- 너비는 기본적으로 **최대 길이** (div 같은 block 요소는 부모 너비를 꽉 채움) → `width`로 조정할 수 있음
- 높이는 **콘텐츠의 크기만큼** (폰트 크기를 키우면 커짐) → `height`로 조절할 수 있음
- margin, padding으로 텍스트의 위치를 바꿀 수 있음
- margin은 상하좌우 따로 줄 수 있음: `margin-top` / `margin-bottom` / `margin-left` / `margin-right`
- 실습: resume로 돌아와서 margin과 padding을 이용해 footer를 맨 밑으로 내려 보기

### 🎨 padding vs margin 눈으로 구분하는 법

**배경색**은 content + **padding까지** 칠해지고, **margin은 항상 투명**함

```html
<div style="background-color: coral; padding: 20px; border: 3px solid black; margin: 30px;">
    안녕
</div>
```

→ 코랄색이 글자 주변 20px까지 칠해지고(padding), 검은 테두리 바깥 30px은 투명한 빈 공간(margin)

### ✍️ 값 쓰는 법 (시계 방향!)

| 쓰는 법 | 뜻 |
|---|---|
| `margin: 10px;` | 상하좌우 전부 10px |
| `margin: 10px 20px;` | 위아래 10px, 좌우 20px |
| `margin: 10px 20px 30px 40px;` | **위 → 오른쪽 → 아래 → 왼쪽** (시계 방향 ⏰) |
| `margin-top: 10px;` | 한 방향만 따로 |
| `margin: 0 auto;` | 좌우를 자동으로 똑같이 → **블록 박스를 가운데 정렬** (width가 있을 때) |

padding도 똑같은 규칙! 기억법: 시계 방향 **위 → 오 → 아 → 왼**

`border`는 세 가지를 같이 씀: `border: 3px solid black;` = **두께 / 선 모양 / 색**

| 선 모양 | 모습 |
|---|---|
| `solid` | ────── 실선 |
| `dashed` | - - - - - - 점선 |
| `dotted` | . . . . . . 점 (t가 두 개!) |
| `none` | 없음 (기본값) |

### 📏 박스 진짜 크기 계산 (틀리기 쉬움 ⚠️)

`width`는 기본적으로 **content만의 너비** (`box-sizing: content-box`)

```
실제 차지하는 너비 = width + padding(좌+우) + border(좌+우)
수업 예시: 100(width) + 50×2(padding) + 5×2(border) = 210px   (margin은 그 바깥에 추가)
```

→ width를 100으로 기대했지만 실제 사이즈는 210! padding을 넣으면 박스가 생각보다 **커져 버림**

해결법: `box-sizing: border-box;` → width 안에 padding, border까지 **포함**해서 계산. 실무에선 거의 다 이렇게 씀

```css
*, *::before, *::after {
    box-sizing: border-box;
}
```

### 🔍 직접 확인하는 법: 개발자 도구

크롬에서 요소 우클릭 → **검사** (또는 ⌘ + ⌥ + I) → 오른쪽 **Computed** 탭 → 박스 모델 그림이 나오고, 각 영역에 마우스를 올리면 화면에서 색깔로 표시됨 (margin 주황, padding 초록, content 파랑)

---

# Part 6. 글꼴 · 링크 · 아이콘

## 글꼴 관련 속성

| 속성 | 예시 |
|---|---|
| `font-size` | `x-large`, `16px`, `1.2rem` |
| `font-weight` | `bold`, `400`, `700` |
| `font-family` | `'Times New Roman', Times, serif` (앞에서부터 있는 글꼴 사용, 마지막은 계열) |
| `font` (한 번에) | `font: bold x-large 'Times New Roman', serif;` → 순서: 굵기 → 크기 → 글꼴 (**크기와 글꼴은 필수**) |
| `color` | 글자 색 |
| `background-color` | 배경색 (content + padding까지) |
| `text-align` | `left` / `center` / `right` |
| `text-decoration` | `none` (링크 밑줄 제거), `underline` |

## 링크 꾸미기 + hover

- `font-size: small`, `color: gray`
- `text-decoration: none` → 기본 밑줄 제거
- `:hover` → 마우스를 위로 올릴 때 나타나는 스타일

```css
.github-link {
    font-size: small;
    color: gray;
    text-decoration: none;
}
.github-link:hover {
    text-decoration: underline;
}
```

```html
<a class="github-link" href="https://github.com/choiqua">My GitHub</a>
```

## Font Awesome (아이콘)

- 웹 아이콘을 **글꼴처럼** 쓰는 라이브러리 → 글자처럼 `color`, `font-size`로 색과 크기 조절 가능
- ① head에 CDN `<link>` 넣기 → ② 원하는 곳에 `<i class="...">`

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
...
<a class="github-link" href="https://github.com/choiqua">
    <i class="fa-brands fa-github"></i> GitHub
</a>
```

- `class="fa-brands fa-github"` → 깃헙 모양 아이콘으로 바꿔라
- `<i>` 태그는 원래 기울임(italic)인데, Font Awesome에서 아이콘 자리 표시용으로 관례처럼 쓰는 것

> ✅ 보완
> - 수업에서 쓴 cdnjs 주소는 공개 CDN이라 **회원가입 없이도** 그대로 쓸 수 있어. 회원가입하면 나만의 Kit(스크립트 한 줄) 방식을 쓸 수 있는 것
> - `fa-brands fa-github`는 CSS 선택자가 아니라 HTML class 속성에 **띄어쓰기로 class 2개**를 붙인 것 (fa-brands = 브랜드 아이콘 묶음, fa-github = 깃헙 모양). ⚠️ CSS에서 `.fa-brands .fa-github`처럼 띄어 쓰면 "자손 선택자"라는 전혀 다른 뜻이 돼!

---

# 🧱 오늘(Day06) 막힌 곳 & 복습

복습 날짜: 2026-11-21 · 2026-11-23 · 2026-11-27

| 막힌 곳 | 다시 물어볼 질문 |
|---|---|
| label `for` ↔ `id` (40분 😂) | for가 `userId`, id가 `userid`면 연결될까? |
| id vs name vs class | 서버로 보낼 때 key가 되는 속성은? |
| POST ≠ 암호화 | POST로 보내면 비밀번호가 안전할까? |
| Cascading vs 상속 | 부모에 준 margin이 자식에게 상속될까? |
| 결합자 `div p` vs `div > p` | 손자 p는 둘 중 어디에 선택될까? |
| 우선순위 동점 | 같은 class 규칙이 두 번 나오면 누가 이길까? |
| `class="a b"` vs `.a .b` | HTML의 띄어쓰기와 CSS의 띄어쓰기 뜻 차이는? |
| padding vs margin 위치 | 배경색은 어디까지 칠해질까? |
| 기본값이 0이 아닌 태그 | `ul` 목록이 왼쪽으로 들여쓰기 된 이유는? |
| 값 4개 순서 | `padding: 5px 10px 15px 20px`에서 왼쪽은 몇 px? |
| width 계산 | width 100px + padding 10px + border 2px면 실제 너비는? |
| 터미널 옵션 `-` 빠뜨림 | `ls al`이 실패한 이유는? |
