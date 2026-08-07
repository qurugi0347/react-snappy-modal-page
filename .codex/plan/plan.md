---
status: completed
---

# 최초 브라우저 언어와 i18n localStorage 동기화 계획

## 목표

최초 접근 시 브라우저 언어와 i18n의 `i18nextLng` 값을 기본 언어 코드로 맞추고, `LanguageSwitcher`가 `ko-KR`을 English로 잘못 표시하지 않도록 실제 번역 언어와 우상단 label을 일치시킨다.

## 원인

브라우저 detector가 `ko-KR`을 감지하면 i18next는 `ko` 리소스로 번역할 수 있지만 `i18n.language`에는 지역 코드가 남을 수 있다. 현재 `LanguageSwitcher`는 `ko`와 정확히 일치할 때만 한국어를 표시하고, `ko-KR`은 default 분기로 English를 표시한다. 또한 초기 저장값을 명시적으로 정규화하지 않아 localStorage와 detector가 서로 다른 코드 형식을 사용할 수 있다.

## 설계

### 1. 초기 언어 결정 및 저장 동기화

- 대상 파일: `src/i18n/i18n.ts`, `src/components/LanguageSwitcher.tsx`
- 지원 언어 집합을 `en`, `ko`, `zh`로 명확히 정의한다.
- 브라우저 언어 및 기존 저장값을 `ko-KR → ko`, `zh-CN → zh`처럼 기본 언어 코드로 정규화한다.
- 기존 localStorage 값이 없거나 지원 언어로 해석되지 않을 때 브라우저 언어를 우선 결정한다.
- 브라우저 언어가 지원되지 않거나 접근할 수 없으면 `en`을 결정한다.
- 결정한 값을 i18n 초기화 전에 `i18nextLng`에 기록해 detector와 저장 상태를 일치시킨다.
- detector 옵션의 `lookupLocalStorage: "i18nextLng"`, `caches: ["localStorage"]`를 명시해 저장 계약을 코드에 드러낸다.

### 2. 언어 선택 UI의 표시 코드 정규화

- 선택: i18n 초기화 모듈의 `normalizeLanguage`를 `LanguageSwitcher`에서 재사용한다.
- 이유: 본문 번역과 우상단 label이 같은 언어 코드 정책을 사용해야 `ko-KR`이 English로 표시되는 불일치가 사라진다.
- 차선책: `LanguageSwitcher` 내부에서 `split("-")`를 별도로 수행한다.
- 미채택 이유: i18n 초기화와 UI가 서로 다른 정규화 규칙을 갖게 된다.
- tradeoff: `LanguageSwitcher`가 i18n 초기화 모듈의 정규화 함수에 의존하지만, 현재 이미 같은 모듈에서 `useTranslation`을 가져오므로 결합도 증가가 작다.

### 3. 사용자의 언어 선택 보존

- 선택: 유효한 기존 저장값은 유지한다.
- 이유: `LanguageSwitcher`가 제공하는 사용자의 명시적 선택을 매 방문마다 브라우저 언어로 덮어쓰면 사용자가 선택한 언어가 지속되지 않는다.
- 차선책: 매 초기화 때 `navigator.language`를 localStorage에 강제로 기록한다.
- 미채택 이유: 브라우저 언어가 바뀌지 않아도 사용자의 수동 선택이 사라지는 부작용이 있다.
- tradeoff: 이미 잘못 저장된 유효한 `en` 값은 “최초 방문”으로 판별되지 않으면 유지될 수 있다. 필요하면 별도 초기화 버전 키를 도입해 기존 저장값 마이그레이션 범위를 확장한다.

### 4. 정규화 함수 함수화 여부

- 선택: `src/i18n/i18n.ts`에 작은 순수 함수로 두고 `LanguageSwitcher`에서 재사용한다.
- 이유: i18n 초기화와 언어 label 표시라는 두 사용처가 생겼고, 같은 지원 언어 정책을 보장해야 한다.
- 차선책: 공용 `utils/language.ts`로 분리한다.
- 미채택 이유: 현재 사용처가 두 곳뿐이고 i18n 모듈과 UI가 이미 직접 연결되어 별도 공용 util 파일은 과하다.
- tradeoff: 다른 기능에서 동일한 정규화가 필요해지면 중복 여부를 재평가하고 공용 util로 추출한다.

### 5. 테스트 및 검증 전략

- 현재 테스트 프레임워크와 테스트 스크립트가 없으므로 원본 작업에는 별도 테스트 파일을 추가하지 않는다.
- `yarn lint`로 TypeScript/ESLint 규칙을 확인한다.
- `yarn build`로 Vite 번들 및 타입 관련 빌드 오류를 확인한다.
- 브라우저 수동 검증으로 localStorage가 없는 첫 방문, `i18nextLng=en` 상태에서 브라우저가 `ko-KR`인 경우, 사용자가 언어를 변경한 뒤 재방문하는 경우를 확인한다.
- 자동화 테스트가 필요하면 원본 수정 완료 후 별도 TestCode PR로 진행한다.

## TaskList

### Task 1. 초기 언어 정책 구현

- 변경 대상: `src/i18n/i18n.ts`
- 의존성: 없음
- 내용: 지원 언어 정규화, 최초 저장값 결정, `i18nextLng` 동기화, detector 옵션 명시, 우상단 label 정규화
- 완료 조건: React 렌더링 전에 결정된 언어와 localStorage 값이 일치하고, 유효한 사용자 선택은 보존됨

### Task 2. 정적 검증

- 변경 대상: 없음
- 의존성: Task 1
- 명령: `yarn lint`, `yarn build`
- 완료 조건: 두 명령이 성공함

### Task 3. 브라우저 동작 검증

- 변경 대상: 없음
- 의존성: Task 1, Task 2
- 시나리오: 첫 방문 `ko-KR`, 첫 방문 `zh-CN`, 미지원 언어, 기존 유효 저장값, 기존 무효 저장값, 언어 변경 후 재방문
- 완료 조건: 각 시나리오에서 화면 언어와 `i18nextLng` 값이 정책과 일치함

### Task 4. 완료 보고 및 커밋 준비

- 변경 대상: 계획 범위 내 파일만
- 의존성: Task 1~3
- 내용: diff/status 확인, 잔여 위험 기록, 사용자 승인 후 커밋 준비
- 완료 조건: 의도하지 않은 변경이 없고 구현 결과와 검증 결과를 보고할 수 있음

## 예상 변경 파일

- 구현: `src/i18n/i18n.ts`
- 계획: `.codex/plan/context.md`, `.codex/plan/plan.md`, `.codex/plan/checklist.md`

## 완료 기준

- 첫 방문 시 지원되는 브라우저 언어가 화면, 우상단 label 및 `i18nextLng`에 일관되게 반영된다.
- 기존의 유효한 사용자 언어 선택은 유지된다.
- 미지원 언어는 `en`으로 안전하게 fallback된다.
- `yarn lint`와 `yarn build`가 성공한다.
- 수동 브라우저 검증 결과가 기록된다.
