# Day05 정리: Git 협업 + HTML 기초 태그

> 원본 노션 정리(Day05)를 옮겨 적은 파일. 노션에 있던 캡처 이미지들은 md로 옮겨지지 않아서 빠져 있음.

---

# Part 1. Git 복습 & 협업

## push 루틴

```bash
git status            # 다 commit 됐는지 확인

git add .
git status            # 초록색(staged)으로 바뀌었는지 확인
git commit -m "안된거 다 커밋"

git remote -v         # 원격 연결 확인 → origin  git ssh 주소가 떠야 됨

# 연결돼 있으면
git push

# 연결 안 돼 있으면
git remote add origin SSH주소
git remote -v         # 연결 체크 (fetch/push 두 줄이 나오면 OK)
git push -u origin main
```

앞으로는 심플하게:

```bash
git add .
git commit -m "메시지"
git push
```

### `git push -u origin main` vs `git push`

```bash
git push -u origin main
# "origin(GitHub)의 main으로 보내줘. 그리고 앞으로도 여기가 기본 배송지야!" (주소 적기 + 단골 등록)
git push
# "평소 거기로 보내줘" (단골 주소로 자동 배송)
# 그래서 처음 한 번은 -u로 등록하고, 그다음부터는 git push만 치면 됨
```

## pull = fetch + merge

- 내 컴퓨터의 `main`과 GitHub의 `main`은 **다른 애**다.
- 원격에 있는 main은 `origin/main`이라고 부르고, fetch(다운받기)를 하면 로컬에 두 개가 존재하게 됨.
- `git fetch` = 원격 변경만 내려받아 `origin/main`에 두기 (내 main은 그대로)
- `git pull` = fetch + 내 main에 merge
- 근데 conflict(충돌) 위험이 있음 → **충돌 위험이 있다면 미리 협의해야 한다.**

```bash
git pull    # 다운받아 가져오기
```

## 리뷰가 필요할 때: 브랜치로 push → Pull Request

검토를 받아야 할 때가 있음. 그럼 바로 main에 반영하는 게 아니라 미리 review 요청을 해야 함.

```bash
# 이럴 땐 브랜치로 올리기
git push origin docs/readme
```

- Pull Request를 하면, 병합 권한을 가진 사람이 코드 리뷰를 하고 feedback을 주거나 main에 반영한다.
- 용어 정리: 리뷰어가 승인하면 **merge(병합)** 한다고 함. "Pull Request" = "내 브랜치를 당겨가서(pull) 합쳐 달라는 요청"이라 이름에 pull이 들어간 것.

### Compare & Pull request 누르면?

- pull request는 말 그대로 **요청**이기 때문에 아직 합쳐진 건 아님!
- 줄여서 **PR**이라고 함. ("하 오늘 PR 3개 함 슈퍼 빡심" = 큰 거 세 개 리뷰했다는 뜻)
- **LGTM** 👍 (= Looks Good To Me) → 제대로 안 보고 그냥 매크로 답변한다는 밈이 있음 😂

## 처음에 싹 다 동기화: git clone

- 원격 저장소에 있는 레포(레포지토리)를 **처음** 내 로컬에 동기화할 때 사용
- 작업을 막 하고 있었는데 신입 직원이 오면? → clone으로 전체 다운부터 해야 됨

```bash
git clone 주소

# clone 할 땐 지금 작업 중인 데가 아니라 새로운 데다 해야 함
cd ..
mkdir clone
cd clone

# 끝의 . 은 '지금 폴더에 바로' 클론하라는 뜻
# (. 안 쓰면 fastapi 라는 폴더가 새로 생기고 그 안에 받아짐. 어차피 전체는 항상 다 받아옴)
git clone https://github.com/fastapi/fastapi.git .
```

## 명령어 방향 정리

| 명령 | 방향 | 설명 |
|---|---|---|
| `git push` | 로컬 → 원격 | 업로드 |
| `git pull` | 원격 → 로컬 | 변경된 커밋을 가져옴 (fetch + merge) |
| `git clone` | 원격 → 로컬 | 전체 코드를 처음 동기화 |
| fork | 다른 원격 → 내 원격 | 남의 저장소를 그대로 내 GitHub로 복사 |

- fork는 `git` 명령어가 아니라 **GitHub 웹의 Fork 버튼** 기능 (`git fork`는 없음)
- clone이 한 번 돼 있어야 그다음에 pull이 이어지는 거라, **clone이 안 된 상태에서는 pull이 안 됨**

---

# Part 2. HTML & CSS

HTML / CSS / 부트스트랩을 배울 예정. 실습 환경부터 구축하자 → **Live Preview** 설치

## HTML이란?

- HTML은 **HTTP로 주고받는 "문서"를 만드는 마크업 언어**
  - HTTP = 택배 규칙(통신 규약), HTML = 상자 안에 든 물건(문서)
  - 전에 `curl example.com` 했을 때 보였던 게 바로 HTML!
- 웹 페이지의 **구조**를 정의하는 언어
- 글의 제목, 문단, 이미지, 링크 같은 웹 페이지의 **뼈대**를 만드는 역할

### 웹과 HTML

- 서버가 HTML 문서를 만들어서 브라우저에 전달
- 브라우저는 HTML을 읽고 화면의 기본 구조를 그림
- 서버 → HTML 전달 → 브라우저 → 화면 구조 생성

## HTML의 기본 구조

- HTML 문서는 항상 일정한 기본 틀을 가짐
- 태그(tag)들의 조합으로 구성
  - 태그는 `<태그이름>` 형태로 작성
  - 각 태그마다 요소의 의미와 역할을 가짐
  - 대부분의 태그는 여는 태그와 닫는 태그(`/`가 있음)로 이루어짐
- 예시: `<h1>제목</h1>`, `<p>문단 내용</p>`

### 태그 안에 다른 태그가 들어갈 수 있음 → 중첩 구조로 문서의 계층이 만들어짐

```
<부모태그>
    <자식태그>  ┓
                ┃ 형제 태그
    <자식태그>  ┛
```

### HTML은 반드시 맨 위에 "얘가 HTML이다"라는 걸 선언해 줘야 함!!!

- `<!DOCTYPE html>` 해 주고
- `<html>` 하면 밑에 닫는 태그도 자동으로 됨

### VS Code 설정 팁

- Tab으로 자동완성이 안 되면 `Command + ,` →
  - `Emmet: Show Abbreviation Suggestions` 체크
  - `Emmet: Show Expanded Abbreviation` → always
- 실습할 땐 **Copilot 꺼야 함** → inline suggestions 꺼 주기

### head와 body

- **head** (메타 정보)
  - 데이터를 설명하는 데이터 = 메타데이터 = 설명 데이터
  - head에 들어가는 대표적인 녀석: `title` (탭 이름)
- **body** (실제로 보내고 싶은 데이터)
  - 본문
  - 실제로 화면에 그려지는 부분

### Live Preview

- 수정하면 수정하는 대로 내용이 바로 반영됨!
- 크롬으로 바로 열어 볼 수도 있음: Finder에서 열기 → 우클릭 → 크롬으로 열기
- 주소창을 보면 파일 경로가 있는 걸 알 수 있다!

### `!` + 엔터 → 기본 구조 자동완성

- `lang="en"` → 어떤 언어로 작성됐는지 (크롬 자동번역이 이걸 이용해서 언어 감지). 한국어 페이지면 `lang="ko"`
- `<meta>` → 말 그대로 메타데이터

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- `width=device-width` = 화면 너비를 **기기(폰) 화면 너비에 맞춤**
- `initial-scale=1.0` = 처음 열 때 **확대 없이 100%**
- 이게 없으면 폰에서 페이지가 PC 화면처럼 작게 축소돼서 보임

## 줄바꿈: `<br>`, `<p>`

- HTML의 기본 성질 때문에 엔터를 쳐도 줄바꿈이 안 됨 (태그 단위로 작성하기 때문에 여백 같은 건 무시함)
- 줄바꿈하려면 줄바꿈 태그를 써야 함 → **break**의 약자 `<br>`
- 아니면 `<p>` 태그 활용:

```html
<p>Hello, HTML!</p>
<p>Hello, HTML!</p>
<p>Hello, HTML!</p>
```

- 단, `<p>`는 **문단**으로 인식하기 때문에 줄이 바뀌는 것 (정확하게는 다른 의미지만 그냥 이렇게 쓸 수도 있다고)

## 제목 `<h1>`~`<h6>`, 구분선 `<hr>`

- 마크다운처럼 큰 제목, 중간 제목, 작은 제목. **h6까지** 있음
- 보완: h1~h6은 **글자 크기가 아니라 제목의 단계(중요도)**. 글자 크기는 CSS로 조절하고, 코드 메모(주석)는 `<!-- -->`를 씀. h1은 페이지당 보통 1개
- 가로 구분선은 `<hr>` (horizontal line)
- 아쉽게도 세로 구분선은 태그로는 없고 다른 방법(CSS)이 따로 있다

## 목록 (List)

항상 새로 만들면 `!` + 엔터

HTML에는 순서(Order)가 있고 없는 리스트가 있음:

| 태그 | 뜻 |
|---|---|
| `<ul>` | Unordered List (순서 없음, 점) |
| `<ol>` | Ordered List (순서 있음, 번호) |
| `<li>` | 목록 항목 |

### 속성(Attribute)으로 번호 모양 바꾸기

- `<ol type="a">` → 기본은 숫자로 표시되지만 이렇게 하면 알파벳으로 나옴
- `type="A"` (대문자), `type="i"` (로마 숫자)
- `<ol style="list-style-type: hangul-consonant;">` → ㄱ, ㄴ, ㄷ 순서
  - `style` 안은 CSS 문법: `속성: 값;` 형태이고, `;`는 **한 문장(설정 하나)이 끝났다**는 표시

## 표 (Table)

- `table` > `thead`(머리글 묶음) / `tbody`(본문 묶음) > `tr`(table row, 한 줄) > `th`(table header, 제목 칸, 굵게+가운데) / `td`(table data, 내용 칸)

```html
<table width="400" border="3" bgcolor="coral">
```

| 속성 | 뜻 |
|---|---|
| `width` | 가로 사이즈 |
| `border` | 테두리 두께(픽셀) |
| `bgcolor` | 배경 색상명 (옛날 방식, 요즘은 CSS로) |
| `colspan="3"` | 칸 가로로 합치기 (3칸을 1칸으로) |
| `rowspan="2"` | 칸 세로로 합치기 |
| `align="center"` | 가운데 정렬 (옛날 방식, 요즘은 `style="text-align: center;"`) |

## 이미지 `<img>`

```html
<img src="" alt="">
<img src="" width="200" alt="대교">
```

- `alt` = **Alternative** (대체 텍스트)
- `alt="pizza"` → 사진을 못 띄울 때 'pizza'라는 대체 텍스트를 띄운다
- 시각 장애인의 경우 HTML을 읽어 주는 기능(스크린리더)이 있는데, 그때 "pizza 사진이 있다"라고 읽어 줌

## 링크 `<a>` (anchor)

- anchor → 사전적 의미는 **닻** ⚓
- 하이퍼링크인 것. 외부 사이트는 `https://`까지 작성해 줘야 함
- `href` ⇒ **H**ypertext **REF**erence (클릭하면 갈 주소)

```html
<body>
    <a href="https://google.com">구글</a>로 이동
</body>
```

## 폼 `<form>`

- `input`으로 입력 박스를 만들고, `button`에 텍스트 표시
- button을 누르면 어딘가로 데이터가 전송됨
- 근데 이 상태로는 뭘 입력해야 되는지 모름 → `placeholder="이름 입력"`

| type | 설명 |
|---|---|
| `type="text"` | 텍스트 입력 가능 |
| `type="email"` | 이메일 형식만 입력 가능 |
| `type="password"` | 입력값이 가려짐 |
| `type="search"` | 검색어 입력하면 x 버튼이 나옴 |

- form : 데이터를 입력받는 HTML 태그(요소) → 쿼리 파라미터
- 보완: 쿼리 파라미터로 가는 건 **`method="get"`일 때**! 그리고 input에 **`name` 속성이 있어야** 보내짐 (`name="q"` → `?q=입력값`). name이 없으면 입력해도 아무것도 안 감
- `action="https://google.com/search"`
- `?q` : 구글에서 정해 놓은 이름

## POST (= Create)

- 회원가입 (다음 시간에!)

---

# 📌 보완: 수업 자료 기준 정리 (POST 전까지)

## 1. HTML 문서가 화면에 뜨는 과정

1. 브라우저가 서버에 HTML **요청** (Day02의 HTTP 요청!)
2. 서버가 HTML 문서로 **응답**
3. 브라우저가 HTML을 **해석(parsing)**
4. 화면 구조 **DOM** 생성
5. CSS 적용 → 화면 표시

### DOM (Document Object Model)

브라우저가 HTML을 읽어서 만든 **트리(나무) 구조**. 태그와 텍스트 하나하나가 **노드(node)** 가 됨. 나중에 JavaScript가 화면을 바꿀 때 건드리는 대상이 바로 DOM

```
document
└─ html
   ├─ head
   │  └─ title
   │     └─ "My Page"
   └─ body
      └─ "Hello, HTML"
```

> **HTML = 설계도, DOM = 설계도를 보고 브라우저 안에 실제로 지은 건물** 🏗️

## 2. 실습 환경

| 방법 | 명령 / 설정 |
|---|---|
| Live Preview (VS Code 확장) | ⌘⇧P → `Live Preview: Show Preview` → 저장할 때마다 바로 반영 |
| 파이썬 로컬 서버 | html 폴더에서 `python3 -m http.server` → 브라우저에서 `localhost:8000` (Day03의 localhost, 개발 서버 8000번 포트!) |
| emmet | 새 파일에서 `!` + Tab/엔터 → 기본 구조 자동 완성 |

## 3. 기본 구조 한눈에

| 태그 | 역할 |
|---|---|
| `<!DOCTYPE html>` | "이 문서는 HTML5야" 선언 (맨 위 필수) |
| `<html lang="ko">` | 최상위 태그. `lang`은 문서 언어 (한국어 페이지면 `ko`가 맞음) |
| `<head>` | 화면에 안 보이는 설정 영역 (메타데이터) |
| `<meta charset="UTF-8">` | 한글이 안 깨지게 하는 글자 인코딩 |
| `<title>` | 브라우저 탭 제목 + **검색 결과 제목**으로도 쓰임 |
| `<body>` | 화면에 실제로 보이는 내용 |

## 4. 오늘 배운 태그 정리

| 태그 | 뜻 | 닫는 태그 |
|---|---|---|
| `<p>` | paragraph, 문단 | 있음 |
| `<br>` | break, 줄바꿈 | **없음** (빈 요소) |
| `<h1>`~`<h6>` | heading, 제목 단계 | 있음 |
| `<hr>` | horizontal rule, 가로 구분선 | **없음** |
| `<ul>` / `<ol>` / `<li>` | 순서 없는 / 있는 목록 / 목록 항목 | 있음 |
| `<table>` `<tr>` `<th>` `<td>` | 표 / 줄 / 제목 칸 / 내용 칸 | 있음 |
| `<img src="" alt="">` | 이미지 | **없음** |
| `<a href="">` | anchor, 링크 | 있음 |
| `<form>` `<input>` `<button>` | 입력 양식 / 입력칸 / 버튼 | input은 **없음** |

> 💡 HTML은 엔터, 띄어쓰기 여러 개를 **공백 하나로 합쳐 버림** → 그래서 줄을 바꾸려면 `<br>`이나 `<p>`가 필요

## 5. 속성(Attribute)

- 형태: `<태그이름 속성="값">`
- **여는 태그에만** 씀, 한 태그에 여러 개 가능, 태그마다 쓸 수 있는 속성이 다름
- 예: `href`(링크 주소), `src`(이미지 경로), `alt`(대체 텍스트), `type`, `placeholder`, `name`, `border`
- ⚠️ 따옴표는 꼭 **곧은 따옴표 `"`** (노션 등에서 복사하면 `”`로 바뀌어서 속성이 안 먹을 수 있음)

### 경로 쓰는 법 (이미지, 링크)

- **절대 주소**: `https://...` (인터넷 어딘가)
- **상대 주소**: `./IMG_4399.JPG` = 지금 html 파일과 **같은 폴더**의 파일, `../` = 한 칸 위 폴더 (터미널 `cd`랑 똑같은 규칙!)
- ⚠️ 대소문자 주의: 맥에선 `img_4399.jpg`로 써도 열리지만, **리눅스 서버에 올리면 깨짐**

## 6. form + GET = 쿼리 파라미터 (Day02 연결!)

```html
<form action="https://google.com/search" method="get">
    <input type="search" placeholder="Search..." name="q" autofocus autocomplete="off">
    <button>입력</button>
</form>
```

`python` 입력 후 버튼 → 브라우저가 이 주소로 **GET 요청**을 보냄:

```
https://google.com/search?q=python
```

| 속성 | 역할 |
|---|---|
| `action` | 데이터를 **어디로** 보낼지 (URL) |
| `method` | **어떻게** 보낼지 (`get` = URL 뒤에 붙임, 기본값) |
| `name` | 쿼리의 **key** 이름 → `?q=` 의 `q` (⚠️ 없으면 전송 안 됨!) |
| `placeholder` | 입력 전 흐린 안내 글씨 |
| `autofocus` | 페이지 열리자마자 커서가 여기로 |
| `autocomplete="off"` | 브라우저 자동완성 끄기 |

> 🔜 **다음 시간 예고: POST** → 회원가입처럼 데이터를 새로 만들 때. 값을 URL이 아니라 **Request Body**에 담아 보냄 (`action="https://httpbin.org/post" method="post"`). Day02에서 배운 Query vs Body가 여기서 실제로 등장!

## 7. 🔍 실습 파일 코드 리뷰

| 파일 | 짚을 점 |
|---|---|
| `form.html` | input에 **`name`이 없어서** 버튼을 눌러도 값이 전송 안 됨 → `name="username"` 등 추가. `action=""`이면 자기 자신에게 보냄 |
| `image.html` | `alt=""`가 비어 있음 → 사진 설명 넣기 (스크린리더, 이미지 깨질 때 대비). `IMG_4399.JPG`가 **4MB**라 웹용으론 무거움 |
| `table.html` | id가 1, 2, **4** → 3번 오타인지 확인 😆 |
| 공통 | 한국어 내용이면 `lang="en"` 대신 `lang="ko"` |
| `paragraph.html`, `list.html` | 깔끔 👍 주석(`<!-- -->`)으로 태그 이름 메모한 거 좋은 습관 |

## 🧱 오늘(Day05) 막힌 곳 & 복습

복습 날짜: 2026-11-20 · 2026-11-22 · 2026-11-26

| 막힌 곳 | 내일 물어볼 질문 |
|---|---|
| `git push -u` (upstream) | 새 브랜치를 처음 push할 때 `git push`만 치면? |
| fetch vs pull | `git fetch`만 하면 내 main 파일이 바뀔까? |
| 웹에서 커밋 후 로컬 push 거부 | `rejected (fetch first)`가 뜨면 먼저 뭘 해야 할까? |
| `rm -rf` & `.git` 읽기 전용 | `override r--r--r--?`가 뜨는 이유는? |
| `ln -s` 경로 실수 (`~` 중복) | `~/Users/c_qua/...`가 틀린 이유는? |
| 대소문자 (맥 vs 리눅스) | `style.CSS`로 링크하면 서버에서 어떻게 될까? |
| form의 `name` 속성 | name 없는 input의 값은 전송될까? |
| `<br>`, `<hr>`, `<img>`는 닫는 태그 없음 | 닫는 태그가 없는 태그 3개는? |
