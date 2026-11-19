# Day04 Git 정리: 브랜치 & merge (Fast-forward / 3-way / Conflict)

> 노션 "Day04 Git" 메모를 정리하고 보완한 파일 (2026-11-18 수업). 노션 캡처 이미지는 md로 옮겨지지 않아서 그림은 텍스트 그래프로 다시 그림.
> `✅ 보완`이 붙은 부분은 메모에서 틀리거나 빠진 내용을 채운 것.

---

## 1. 깃을 사용하는 목적

- **버전 관리** = 코드의 변경 이력을 관리하는 것
- 언제, 누가, 무엇을 바꿨는지 알 수 있고, 필요하면 과거 상태로 되돌릴 수 있음

## 2. `.git` 폴더 = 저장소의 심장 (일기장)

- `git init` 하면 깃 레포지토리가 생성되면서 `.git`이라는 하위 폴더가 생긴다
- 이번에는 `.git`을 지워 보자
  - `open .` → 지금 폴더를 Finder로 열기
  - `Command + Shift + .` → 숨김 파일/폴더 표시 (`.git`은 이름이 `.`으로 시작하는 숨김 폴더)
  - `.git`을 삭제하고 `git status`를 해 보면 → `fatal: not a git repository` (저장소가 아니라고 나옴)
- 이러면 **커밋 이력이 다 사라진다** (파일 자체는 남아 있음)
- `git init` → `.git` 다시 만들기 = **일기장을 잃어버려서 새 일기장을 산 것** 📔 (옛날 일기는 못 돌아옴)

> ✅ 보완: 터미널에서 지우려면 `rm -rf .git`. `.git` 안 파일들은 읽기 전용이라 `rm -r`만 쓰면 `override r--r--r--?`라고 하나하나 물어봄. GitHub에 push해 둔 저장소라면 `git clone`으로 이력까지 다시 받을 수 있음

```bash
git init
git add api.py hello.py world.py
git commit -m "create files"
git log        # 커밋 완료된 걸 볼 수 있음
```

> ✅ 보완: 메모의 `git commt`는 오타 → `git commit`. 메시지는 곧은 따옴표(`"` 또는 `'`)로 감싸야 함 (노션에서 복사한 `‘ ’`는 안 됨)

## 3. 브랜치 만들고 이동하기

```bash
git branch feat/ui      # 새 브랜치 만들기 → 만든 순간엔 main과 똑같은 상태
git switch feat/ui      # 그 브랜치로 이동
# ui.py 만들고
git add ui.py
git commit -m "create ui"
```

- 그럼 `ui.py`는 **feat/ui 브랜치에만** 존재한다
- feat/ui는 main 커밋 **이후에** 생성된 것이기 때문에 main에 있는 걸 다 가지고 있음

| 브랜치 | 파일 |
|---|---|
| main | api / hello / world |
| feat/ui | api / hello / world / **ui** |

- feat/ui의 작업을 main에 적용시키는 걸 **merge(병합)** 라고 함

> ✅ 보완: `git switch -c feat/ui` 하면 만들기 + 이동을 한 번에. 브랜치는 폴더 복사가 아니라 **커밋을 가리키는 포스트잇(포인터)** 이라서 만들 때 엄청 가벼움

## 4. Fast-forward merge (빨리 감기) ⏩

main으로 가서 feat/ui를 **땡겨 오는** 거:

```bash
git switch main          # main으로 이동 (땡겨 오는 쪽에 서 있어야 함!)
git merge feat/ui        # feat/ui 내용을 지금 브랜치(main)로 합치기
```

```
merge 전
main:     A
feat/ui:  A ── B (create ui)

merge 후
main:     A ── B      ← main 포인터만 B로 쭉 당김. 새 커밋 없음
```

- 왜 Fast-forward? → 다른 건 `ui.py`뿐이고, main은 그동안 **가만히 있었으니까**. main을 빨리 감기 해서 feat/ui랑 같게 만드는 것
- 만약 feat/ui가 커밋 3개를 앞서가 있어도 → **이것도 한 방에 간다**

> **Fast-Forward Merge**: 같은 흐름으로 진행된 커밋일 때, 한 번에 따라잡는 것

## 5. 브랜치 정리

- UI는 작업 중일 때 AI만 먼저 FF로 합치고, 필요 없어진 feat/ai 삭제:

```bash
git branch -D feat/ai
```

> ✅ 보완: 이미 merge가 끝난 브랜치는 **`-d`(소문자)로도** 지워짐. `-d`는 "아직 합쳐지지 않은 커밋이 있으면 거부"하는 **안전 삭제**, `-D`는 **강제 삭제**라 작업을 날릴 수 있음. 합친 브랜치는 `-d` 습관 추천!

## 6. 3-way merge (병합 커밋) 🔀

feat/ai를 main에 FF로 합친 **뒤에** feat/ui를 합치려면?

```
           ┌── C (create ai)   ← main (ai를 FF로 합쳐서 여기까지 옴)
  A ── B ──┤
           └── D (create ui)   ← feat/ui
```

- main도 앞으로 갔고(C), feat/ui도 앞으로 갔음(D) → **길이 갈라짐**
- 이러면 **FF로는 해결이 안 됨** (main을 D로 쭉 당기면 C(create ai)가 사라지는 거라서 안 됨. 주의할 것!)
- 길을 새로 터 줘야 함 → **새로운 공통 커밋(슈타인즈 게이트)** 을 만들어서 합쳐 버리면 된다

```
           ┌── C ──┐
  A ── B ──┤       ├── M (Merge branch 'feat/ui')   ← main
           └── D ──┘
```

- 이 M을 **병합 커밋**이라고 하고, 이 방식을 **3-way merge**라고 한다

> ✅ 보완: 왜 "3-way"냐면 Git이 **세 개를 비교**해서 합치기 때문: ① 공통 조상(B) ② main 쪽(C) ③ feat/ui 쪽(D). `git merge feat/ui` 하면 병합 커밋 메시지를 쓰라고 편집기(vim)가 열리는데, 기본 메시지 그대로 `:wq` 하면 됨

| | Fast-forward | 3-way merge |
|---|---|---|
| 언제 | main은 그대로, 상대만 앞으로 감 (분기 없음) | 양쪽 다 앞으로 감 (분기 있음) |
| 동작 | main 포인터만 앞으로 이동 | 세 개 비교해서 합침 |
| 새 커밋 | 없음 | **병합 커밋** 생김 |

> 커밋 = 내가 뭔가 변경 사항이 있을 때 그걸 기록하는 것

## 7. 근데 문제가 있다: Conflict (충돌) 💥

**같은 파일의 같은 줄**을 두 브랜치에서 서로 다르게 고치면?

1. `git merge left` → 문제 없음 (FF)
2. 이러고 `git merge right` 하면? → **충돌!**
3. 애매하다.. 코드 작업 시간 기준이라고 하기도 그렇고, 둘 중 하나만 선택하는 것도 이상하고
4. 예를 들어 보자: scikit-learn에서 `.predict()`를 먼저 하고 `.fit()`을 하면, 학습이 안 된 상태에서 predict를 할 수 없으니 아예 실행이 안 됨 → **Git이 대신 판단할 수 없는 문제**
5. 걍 해 보자

```bash
git branch left
git branch right
# 각 브랜치에서 같은 파일 같은 줄을 다르게 수정하고 commit
git switch main
git merge left       # merge 될까? → 당연히 FF로 됨
git merge right      # → CONFLICT (충돌남)
```

> ✅ 보완: 메모의 `git branch left right`는 **틀린 명령**이야. 이건 "right를 기준으로 left라는 브랜치를 만들어라"라는 뜻이라 브랜치가 하나만 생기거나 에러가 남. 두 줄로 따로 만들어야 함

### 충돌 해결법

충돌이 나면 파일이 이렇게 바뀜:

```
<<<<<<< HEAD
지금 내 브랜치(main) 내용
=======
합치려는 브랜치(right) 내용
>>>>>>> right
```

- 충돌 난 건 **마음에 드는 방향으로 그냥 수정하면 됨** (정해진 답 없음. 하나만 남겨도, 둘 다 살려도, 새로 써도 됨)

> ✅ 보완: 해결 3단계 → ① 파일 열어서 `<<<<<<<`, `=======`, `>>>>>>>` **마커까지 다 지우고** 원하는 내용만 남기기 → ② `git add 파일` → ③ `git commit`. 마커를 안 지우고 커밋하면 마커가 코드에 그대로 박혀 버림! 중간에 포기하고 싶으면 `git merge --abort`로 merge 전 상태로 되돌리기

### 그래서 교훈

- 이런 이유로 **최대한 잘게 쪼개면서**
- merge하면서 **조립하는 방식**으로
- **많이, 빠르게, 자주** 하는 게 낫다 (오래 따로 놀수록 충돌이 커짐)

## 8. GitHub & 오픈 소스

- **GitHub**: Git 저장소를 올려 두는 웹 서비스. 저장소를 **공개(Public)** 하면 누구나 코드를 볼 수 있음 (Private이면 나랑 초대한 사람만)
- **오픈 소스(Open Source)**: 소스 코드를 공개해서 누구나 보고, 쓰고, 기여할 수 있게 한 소프트웨어
  - Git / Linux / Python
  - PyTorch, NumPy, SQLite, VS Code
  - 기여는 보통 **Fork → 수정 → Pull Request** 흐름으로 함

---

## 📌 같은 날 실습하다 나온 것들

| 상황 | 정리 |
|---|---|
| 누구는 `main`, 누구는 `master` | Git 기본값은 아직 `master`. `git config --global init.defaultBranch main`이 설정돼 있으면 `main`. 이미 만든 저장소는 `git branch -m master main` |
| 폴더 삭제 | `rmdir 폴더` = 빈 폴더만 / `rm -r 폴더` = 통째로 (휴지통 안 거침 ⚠️) |
| VS Code 터미널 여러 개 | `⌃ + 백틱` 으로 열고 `⌘ + \` 로 좌우 분할. 위쪽(편집기 영역)은 명령 팔레트 → `Terminal: Create New Terminal in Editor Area to the Side` |
| 브랜치 목록 / 삭제 | `git branch`, `git branch -v`, `git branch -a` / 지금 서 있는 브랜치는 못 지움 → 먼저 `git switch main` |
| `-D`로 지웠는데 후회 | 삭제 메시지의 `(was eb86315)` 해시로 `git branch 이름 eb86315` 하면 부활 (`git reflog`로도 찾을 수 있음) |

## 🧱 막힌 곳 & 복습

복습 날짜: 2026-11-19 · 2026-11-21 · 2026-11-25

| 막힌 곳 | 다시 물어볼 질문 |
|---|---|
| merge ≠ 덮어쓰기 | main 그대로 + feature만 커밋 2개 → merge하면 새 커밋이 생길까? |
| FF가 안 되는 경우 | main과 feature가 둘 다 앞으로 갔으면 어떤 merge가 될까? |
| 충돌 마커 | `=======` 위쪽은 어느 브랜치 내용? |
| `git branch left right` | 브랜치 두 개를 만들려면 어떻게 쳐야 할까? |
| `-d` vs `-D` | merge가 끝난 브랜치는 뭘로 지우는 게 안전할까? |
| `.git` 삭제 | `.git`을 지우면 파일과 커밋 이력 중 뭐가 사라질까? |
