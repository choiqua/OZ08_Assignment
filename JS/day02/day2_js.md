# Day09 · JavaScript 기초 정리

> 수업 실습 파일(`04_javascript/*.js`) 순서대로 정리. 출력은 node로 직접 실행해서 확인한 값

## 0. 들어가기: 상수와 하이퍼파라미터

- **파라미터**: 모델이 학습으로 찾아내는 값 (가중치, 편향)
- **하이퍼파라미터**: 사람이 미리 정해 주는 값 (학습률, 에포크 수) → 그래서 `LEARNING_RATE = 0.5`처럼 상수 이름으로 씀
- Python에는 진짜 상수가 없음. **대문자 이름 = "바꾸지 말자"는 약속**일 뿐, 재할당은 가능
- JS에는 `const`라는 **진짜 상수**가 있어서 다시 넣으면 에러

## 1. JS 연결 (js.html + app.js)

```html
<body>
  <h1>Hello, JS</h1>
  <script src="./app.js"></script>
</body>
```

- `./app.js` = 지금 폴더(`.`)의 app.js
- `console.log`는 화면이 아니라 **개발자 도구 Console 탭**에 찍힘
- 요즘 관례: `<head>` 안에 `<script src="..." defer></script>` (HTML을 읽으면서 JS를 미리 받고, 다 읽은 뒤 실행)

## 2. 변수 vs 상수 (var.js)

```javascript
let age = 20;
age = 30;           // let은 다시 넣기 OK

const pi = 3.141592;
pi = 3.15;          // ❌ TypeError: Assignment to constant variable.
```

| | Python | JS |
|---|---|---|
| 변수 | `age = 20` | `let age = 20` |
| 상수 | `PI = 3.14` (약속) | `const pi = 3.14` (에러로 막음) |

- 실무 습관: **기본은 `const`**, 값이 바뀌어야 할 때만 `let`
- `let`은 처음 한 번만. 같은 이름을 또 `let` 하면 `SyntaxError`

## 3. 자료형

| 파일 | 코드 | `typeof` | Python |
|---|---|---|---|
| number.js | `10`, `3.14` | `"number"` (둘 다) | int / float |
| string.js | `'alex'` | `"string"` | str |
| bool.js | `true`, `false` | `"boolean"` | `True`, `False` |
| undefined.js | `let score;` | `"undefined"` | 없음 |
| null.js | `let selectedUser = null;` | `"object"` ⚠️ | `None` |

- **undefined** = 아직 아무도 안 넣음 (JS가 자동으로 채움)
- **null** = "비어 있음"을 개발자가 **일부러** 넣음
- `typeof null`이 `"object"`인 건 JS 초창기 버그가 그대로 남은 것
- boolean 변수 이름은 `isStudent`, `hasTicket`처럼 is/has로 시작하는 게 관례

## 4. 산술 연산자 (arithmetic.js)

```javascript
let a = 10, b = 3;
a / b              // 3.3333333333333335
Math.floor(a / b)  // 3  ← Python a // b
a % b              // 1  ← Python a % b
```

- JS엔 몫 연산자 `//`가 없어서 `Math.floor()`(내림)로 대신함
- ⚠️ 음수 나머지는 다름: JS `-7 % 3` → `-1`, Python → `2`
- `0.1 + 0.2` → `0.30000000000000004` (2진수 저장 오차, Python도 같음)

## 5. 비교 연산자 + 표현식/구문 (compare.js)

```javascript
10 > 5    // true
10 >= 10  // true
10 <= 9   // false
```

- 결과는 항상 boolean
- **표현식(expression)**: 계산하면 값 하나가 나오는 코드 (`10 > 5`, `3 + 4`)
- **구문(statement)**: 컴퓨터에게 일을 시키는 문장 (`let a = 10;`, `if (...) {}`)
- `console.log(12414 + 3253242)` → 괄호 안 표현식이 먼저 값 하나로 바뀐 뒤 출력

## 6. 동등 비교 == vs === (equal.js)

```javascript
10 == "10"    // true  ← 문자 "10"을 숫자로 바꿔서 비교
10 === "10"   // false ← 타입까지 비교
null == null  // true
```

- `==`는 몰래 타입을 바꿈 = **암묵적 형 변환(type coercion)**. 숫자 vs 문자면 **문자 → 숫자**
- 왜 이래? JS는 웹페이지에 간단한 동작을 붙이려고 만든 **너그러운 언어**라서, 타입이 안 맞아도 멈추지 말고 실행되게 설계됨
- 그래서 `"" == 0`도 true가 되는 이상한 결과 → **실무에선 항상 `===`, `!==`**
- SQL은 `IS NULL`을 써야 하지만, JS의 null은 그냥 값이라 `===`로 비교 가능

## 7. 논리 연산자 (logical.js)

| JS | Python | 뜻 |
|---|---|---|
| `&&` | `and` | 둘 다 참이어야 참 |
| `\|\|` | `or` | 하나만 참이어도 참 |
| `!` | `not` | 뒤집기 |

```javascript
let age = 20, hasId = true;
age >= 19 && hasId   // true
age < 25 || !hasId   // true
```

## 8. 문자열 연결 + 형 변환 (concat.js)

```javascript
"Alex" + " " + "Kim"   // "Alex Kim"
10 + "20"              // "1020"  (하나라도 문자면 이어 붙이기)
10 + Number("20")      // 30      (Python int("20"))
"10" - 3               // 7       (- * / 는 숫자로 바꿔서 계산)
```

- 브라우저 입력(`prompt()`, `<input>.value`)은 **항상 문자열** → 계산 전 `Number()` 필수
- `Number("abc")` → `NaN`, `Number("")` → `0` (주의), `parseInt("20px")` → `20`
- 템플릿 리터럴: `` `${firstName} ${lastName}` `` (Python f-string)

## 9. 조건문 (if.js)

```javascript
if (age <= 8) {
  console.log("어린아이입니다.");
} else if (age <= 19) {
  console.log("학생입니다.");
} else {
  console.log("어른입니다.");
}
```

- Python `elif` = JS `else if`, 조건은 괄호 `( )` 필수, 범위는 중괄호 `{ }`
- 위에서부터 처음 참인 곳 하나만 실행
- **falsy**(거짓 취급): `false`, `0`, `""`, `null`, `undefined`, `NaN` → 나머지는 전부 **truthy**
- ⚠️ `"0"`, `" "`, `[]`, `{}`는 truthy (Python에선 빈 리스트가 거짓인데 JS는 참)

## 10. 반복문 (for.js, while.js)

```javascript
for (let x = 0; x < 10; x++) {   // (시작; 조건; 한 바퀴 후)
  console.log(x);                // 0 ~ 9
}

let i = 0;
while (i < 3) {
  console.log(i);                // 0, 1, 2
  i++;                           // 빼먹으면 무한 루프
}
```

- `range(10, 20, 3)` = `for (let x = 10; x < 20; x += 3)`
- 횟수가 정해져 있으면 for, 언제 끝날지 모르면 while
- ⚠️ `print(i)`는 Python 습관 실수 → 브라우저에선 **인쇄 창**이 열림

## 11. 배열 (array.js)

```javascript
let numbers = [10, 20, 30];
numbers[0]        // 10
numbers.length    // 3
numbers.at(-1)    // 30
numbers[-1]       // undefined ⚠️ (Python과 다름)

for (let n of numbers) console.log(n);   // 값: 10, 20, 30
```

- 배열엔 `for...of`(값). `for...in`은 인덱스를 **문자열**로 줌
- 타입 섞기 가능하지만 한 배열엔 한 종류가 관례

## 12. 객체 (objects.js)

```javascript
let alex = {
  name: "alex",    // 구분은 쉼표 (세미콜론 ❌ → SyntaxError)
  age: 20
};
alex["age"] += 1;  // = alex.age += 1
alex.height        // undefined (없는 키도 에러 없음)
```

- Python dict와 달리 키 따옴표 생략 가능, 점(`.`)으로 꺼내는 게 기본
- 순서(번호)로 꺼내면 배열, 이름표로 꺼내면 객체

## 13. 함수 (function.js)

```javascript
function add(n1, n2) {   // 정의
  return n1 + n2;
}
let result = add(10, 30);  // 호출 → 그 자리가 40으로 바뀜
console.log(result);       // 40
```

- 함수의 생애 주기: 정의 → 호출 → 실행 → 종료(반환)
- **출력**(`console.log`) = 화면에 보여 주고 끝 / **반환**(`return`) = 호출한 자리에 값을 돌려줌
- `return`을 만나면 함수 즉시 종료 (아래 코드 실행 안 됨)
- return이 없으면 Python은 `None`, **JS는 `undefined`**

실행 순서 연습:

```javascript
console.log("#");
function add(n1, n2) {
  console.log("@");
  return n1 + n2;
}
console.log("!");
let result = add(10, 30);
console.log("$");
console.log(result);
// # ! @ $ 40  (정의만 해서는 실행 안 됨, 호출될 때 @)
```

### 함수도 값이다

```javascript
let f = add;            // 괄호 없음 = 함수 자체(레시피)
console.log(f(10, 20)); // 30
console.log(add);       // [Function: add]  ← 괄호 없이 출력해서
```

- `add` = 레시피, `add()` = 요리(실행 결과)
- 함수를 다른 함수에 넘겨 일을 맡기는 것 = **콜백(callback)** (떡볶이 OEM 비유: 레시피만 넘기면 공장이 만들어 줌)
- 예: `[1, 2, 3].map(n => n * 2)` → `[2, 4, 6]`

## 14. JS로 HTML 바꾸기 (codingapple/index.html)

```html
<h2 id="hello">안녕하세요</h2>
<script>
  document.getElementById("hello").innerHTML = '안녕';
</script>
```

- 문서에서 → id가 hello인 요소를 찾아 → 안쪽을 '안녕'으로 바꿈
- `innerHTML`은 태그까지 해석, `textContent`는 글자 그대로
- 🔐 사용자 입력을 `innerHTML`로 넣으면 `<script>`가 실행될 수 있음(**XSS**) → 입력값은 `textContent`

## 📌 막힌 곳 / 복습

| 막힌 곳 | 다시 물어볼 질문 | 복습 |
|---|---|---|
| `==` 형 변환 방향 | `10 == "10"`에서 바뀌는 건 숫자? 문자? | 11/26 · 11/28 · 12/2 |
| undefined vs null | `let x;`와 `let x = null;`의 typeof는? | 11/26 · 11/28 · 12/2 |
| 입력값은 문자열 | `"5" + 5`와 `"5" - 5`의 결과는? | 11/26 · 11/28 · 12/2 |
| 표현식 vs 구문 | `let a = 3 + 4;`에서 표현식은? | 11/26 · 11/28 · 12/2 |
| truthy / falsy | `if ("0")`, `if ([])`, `if ("")` 중 실행되는 건? | 11/26 · 11/28 · 12/2 |
| for 괄호 3칸 | `for (let i = 1; i <= 10; i += 3)` → 찍히는 숫자는? | 11/26 · 11/28 · 12/2 |
| 배열 뒤에서 세기 | `[1,2,3][-1]`과 `[1,2,3].at(-1)`은? | 11/26 · 11/28 · 12/2 |
| return vs 출력 | `function f(){ console.log(1) }` → `let x = f();`의 x는? | 11/26 · 11/28 · 12/2 |
| innerHTML vs textContent | 사용자 입력을 화면에 넣을 땐? | 11/26 · 11/28 · 12/2 |
