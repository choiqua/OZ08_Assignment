# Day10 · DOM, 이벤트, 타이머

> 수업 실습 파일 순서: dom-api → event-api → mouse → password → input → timer-api

## 0. DOM이란?

- **DOM(Document Object Model)** = 브라우저가 HTML을 읽어서 메모리에 만든 **객체 트리**
- 비유: HTML 파일 = **설계도**, DOM = 설계도로 지은 **실제 집**
- JS가 바꾸는 건 DOM이다. 파일은 그대로라서 **새로고침(F5)하면 JS로 바꾼 내용은 사라진다**

## 1. 찾기 → 바꾸기 → 만들기 (dom-api.html)

```javascript
// 찾기
const h1 = document.getElementById("msg");    // id로만 찾기
const h1b = document.querySelector("#msg");   // CSS 선택자 아무거나 (요즘 표준)
const items = document.querySelectorAll("p"); // 맞는 것 전부

// 바꾸기
h1.textContent = "안녕";
h1.style.color = "red";
h1.style.fontSize = "x-large";   // CSS font-size → JS fontSize (camelCase)
h1.style.textAlign = "center";

// 만들고 붙이기
const p = document.createElement("p");  // ① 만들기 (아직 화면에 없음)
p.textContent = "paragraph";             // ② 내용 채우기
document.body.appendChild(p);            // ③ body 끝에 붙이기 → 이제 보임
```

| 하고 싶은 것 | 코드 |
|---|---|
| 찾기 | `document.querySelector("h1" / ".msg" / "#msg")` |
| 글자 | `.textContent` (사용자 입력은 이것. `innerHTML`은 XSS 위험) |
| 스타일 | `.style.속성` (하이픈 대신 camelCase) |
| 새 요소 | `createElement` → `appendChild` |

- `querySelector`는 맞는 요소가 여러 개여도 **첫 번째 하나만** 돌려준다
- 노션 등에서 복사한 `” “`(둥근 따옴표)는 코드에서 SyntaxError → 곧은 따옴표 `" "`만 사용

## 2. 클릭 이벤트 (event-api.html)

```javascript
const btn = document.querySelector("button");

function clickButton() {
  alert("버튼이 클릭됨!");
}

btn.addEventListener("click", clickButton);   // 괄호 없이!
```

- `addEventListener(이벤트 이름, 함수)` = "이 일이 생기면 이 함수를 실행해 줘"라고 **예약**
- ⚠️ `clickButton()`처럼 **괄호를 붙이면 지금 바로 실행**된다 → 페이지가 열리자마자 alert가 뜨고, 클릭엔 `undefined`가 등록돼서 아무 일도 안 일어남
- `clickButton` = 함수 자체(레시피), `clickButton()` = 실행 결과(요리)
- 이렇게 함수를 넘겨서 나중에 실행하게 맡기는 것 = **콜백(callback)**

## 3. 마우스 이벤트 (mouse.html)

```javascript
const span = document.querySelector("span");

function changeBGColor(color) {
  span.style.backgroundColor = color;
}

span.addEventListener("mouseover", () => changeBGColor("red"));
span.addEventListener("mouseout", () => changeBGColor("gold"));
```

- 값을 넘겨야 하는 함수는 **화살표 함수로 한 번 감싸서** 넘긴다 (`() => 함수("값")`)
- `() => ...` = 이름 없는 함수를 짧게 쓴 것 (화살표 함수)
- 같은 효과는 CSS `span:hover`로도 가능. 단, JS `style.`로 넣은 값은 인라인이라 우선순위가 높아서 한 번 실행되면 CSS `:hover`가 덮인다
- 주석: HTML `<!-- -->`, CSS `/* */`, JS `//` 또는 `/* */` (VS Code `Cmd + /`)

## 4. 입력할 때마다 검사 (password.html)

```javascript
const input = document.querySelector("input");
const p = document.querySelector("p");

input.addEventListener("input", function () {
  if (input.value.length < 4) {
    p.textContent = "4자리 이상 입력하세요.";
    p.style.color = "red";
  } else {
    p.textContent = "사용 가능한 비밀번호 입니다.";
    p.style.color = "green";
  }
});
```

- `"input"` 이벤트 = 글자를 **칠 때마다** 실행 (`"change"`는 입력을 끝내고 칸을 벗어날 때)
- `input.value` = 입력칸의 값 (**항상 문자열**), `.length` = 글자 수
- 🔐 브라우저 JS 검사는 **사용자 안내용**이다. 개발자 도구로 우회할 수 있으므로 진짜 검사는 **서버에서 한 번 더** 해야 한다

## 5. 입력값 출력 + Enter 키 (input.html)

```javascript
const input = document.querySelector("input");
const button = document.querySelector("button");

const p = document.createElement("p");   // 함수 밖에서 한 번만 만듦
document.body.appendChild(p);

function updateDisplay() {
  if (input.value.trim() === "") {   // 빈칸 또는 공백만 입력
    alert("값을 입력해주세요.");
    return;                           // Early Return
  }
  p.textContent = input.value;
  input.value = "";                   // 입력칸 비우기
}

function keydownEnter(event) {
  if (event.key === "Enter") {
    updateDisplay();
  }
}

button.addEventListener("click", updateDisplay);
input.addEventListener("keydown", keydownEnter);
```

- **p를 어디서 만드느냐에 따라 화면이 달라진다**
  - 함수 **안**에서 만들면 → 누를 때마다 새 p가 생겨서 **쌓인다** (채팅창)
  - 함수 **밖**에서 한 번 만들면 → 같은 p를 **덮어쓴다** (마지막 값만 보임)
- `trim()` = 좌우 공백 제거 (`"  a  ".trim()` → `"a"`), Python `strip()`과 같음
- **Early Return** = 잘못된 입력을 맨 위에서 먼저 걸러내고 `return`으로 끝내기 → 본 로직이 깊어지지 않아 읽기 쉽다 (= 입구에서 하는 입력값 검증)
- `event` = 브라우저가 이벤트 함수에 자동으로 넘겨주는 정보. `event.key`에 누른 키 이름(`"Enter"`, `"Escape"`, `"a"`...)

## 6. 타이머 (timer-api.js)

```javascript
// 한 번만 (n ms 뒤)
setTimeout(() => console.log("3초 경과!"), 3000);

// 반복 (n ms마다)
let count = 0;
const timerId = setInterval(() => {
  count++;
  console.log(count + "초 경과");
  if (count === 10) {
    clearInterval(timerId);   // 10번 하고 멈춤
  }
}, 1000);
```

| | setTimeout | setInterval |
|---|---|---|
| 동작 | **한 번** 예약 (알람) | **반복** 예약 (인터벌 운동) |
| 취소 | `clearTimeout(id)` | `clearInterval(id)` |

- Timer API = JS 문법이 아니라 브라우저(와 node)가 빌려주는 **"시간 맞춰 실행해 줘" 도구** (DOM, `alert`, `console`도 같은 부류)
- `timerId` = 예약 **번호표**. 브라우저에선 숫자, node에선 객체. 이걸 `clear...`에 넣어 취소한다
- 시간 단위는 **밀리초(ms)**: `1000` = 1초. `const ONE_HOUR = 1000 * 60 * 60`처럼 상수로 이름 붙이면 읽기 쉽다
- `clearInterval`을 안 하면 **영원히** 반복된다

## 📌 막힌 곳 / 복습

| 막힌 곳 | 다시 물어볼 질문 | 복습 |
|---|---|---|
| addEventListener에 함수 넘기기 | `addEventListener("click", hello())`는 왜 클릭 전에 실행될까? | 11/29 · 12/1 · 12/5 |
| 새로고침과 DOM | 콘솔에서 바꾼 글자는 F5 후에 남아 있을까? | 11/29 · 12/1 · 12/5 |
| createElement 3단계 | `appendChild`를 빼먹으면 화면에 뭐가 보일까? | 11/29 · 12/1 · 12/5 |
| p를 함수 안 vs 밖에서 만들기 | 입력이 계속 쌓이게 하려면 어디서 만들까? | 11/29 · 12/1 · 12/5 |
| setTimeout vs setInterval | 5초마다 반복하다 3번째에 멈추려면? | 11/29 · 12/1 · 12/5 |
