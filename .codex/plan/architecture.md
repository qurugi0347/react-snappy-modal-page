# Architecture

## 전체 변경 요약

- 변경 대상: `src/i18n/i18n.ts`, `src/components/LanguageSwitcher.tsx`
- 핵심 흐름: 브라우저/저장 언어를 지원 언어 코드로 정규화한 뒤 i18n을 초기화하고, 언어 선택 UI도 동일한 정규화 결과를 사용한다.
- 주요 의존성: `i18next`, `react-i18next`, `i18next-browser-languagedetector`
- DB/API 변경: 없음

## 변경 전 흐름

1. i18n 초기화
   1-1. detector가 localStorage 또는 navigator에서 언어를 탐색한다.
   1-2. i18next가 지원 리소스에 맞춰 실제 번역 언어를 결정한다.

2. 언어 선택 UI 렌더링
   2-1. `LanguageSwitcher`가 `i18n.language`를 그대로 읽는다.
   2-2. `ko`/`zh`와 정확히 일치할 때만 한국어/중국어를 표시한다.
   2-3. `ko-KR` 같은 지역 코드이면 default 분기인 English를 표시한다.

## 변경 후 흐름

1. 초기 언어 저장 준비
   1-1. `i18nextLng`가 없으면 `navigator.language`를 `en`/`ko`/`zh`로 정규화한다.
   1-2. 정규화한 언어를 localStorage에 저장한다.
   1-3. 기존 저장값이 있으면 사용자 선택을 보존하되 지역 코드만 기본 언어 코드로 정규화한다.
   1-4. localStorage 접근이 불가능하면 detector가 navigator fallback을 사용한다.

2. i18n 초기화
   2-1. `supportedLngs`와 `load: "languageOnly"`로 리소스 언어를 기본 코드로 제한한다.
   2-2. detector의 localStorage key와 cache를 `i18nextLng`로 명시한다.

3. 언어 선택 UI 렌더링
   3-1. `LanguageSwitcher`가 `normalizeLanguage(i18n.language)`를 사용한다.
   3-2. `ko-KR`은 `ko`로 표시되어 우상단에 한국어를 렌더링한다.
   3-3. dropdown active 상태도 같은 정규화 결과를 사용한다.

4. 검증
   4-1. 빌드/린트로 정적 오류를 확인한다.
   4-2. 실제 서버에 접근해 storage 삭제 후 브라우저 언어와 본문/우상단 표시를 함께 확인한다.

## DB 구조 변경

- 해당 없음

## 코드 흐름 변경

1. 진입점
   1-1. `src/main.tsx`가 React 렌더링 전에 `src/i18n/i18n.ts`를 import한다.
   1-2. i18n 모듈이 localStorage 초기 언어 준비와 detector 설정을 수행한다.

2. 처리 흐름
   2-1. `normalizeLanguage`가 지역 언어 코드를 지원 언어 코드로 변환한다.
   2-2. `LanguageSwitcher`는 변환된 코드로 label과 active 상태를 결정한다.

3. 검증 흐름
   3-1. localStorage/cookie를 삭제한 첫 접근을 확인한다.
   3-2. `ko-KR`, `zh-CN`, 미지원 언어 및 수동 언어 변경을 확인한다.

## plan.md 연결

| Architecture 단계 | plan.md 연결 | checklist.md 연결 |
|---|---|---|
| 1. 초기 언어 저장 준비 | 설계 1, Task 1 | Phase 2 초기 언어 준비 |
| 2. i18n 초기화 | 설계 1, Task 1 | Phase 2 detector 설정 |
| 3. 언어 선택 UI 렌더링 | 설계 2, Task 1 | Phase 2 표시 정규화 |
| 4. 검증 | 설계 4, Task 2~3 | Phase 3 검증 |
