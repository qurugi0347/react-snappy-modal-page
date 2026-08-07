# Context

## 요청

브라우저 자체 언어를 기본 언어로 사용하고 있다. 실제 본문 번역은 한글로 표시되지만, `i18n.language`가 `ko-KR` 같은 지역 코드를 반환하고 우상단 `LanguageSwitcher`가 `ko`와 정확히 일치할 때만 한국어로 표시해 우상단에는 English가 표시되는 문제가 있다. 최초 접근 시 i18n localStorage 값을 브라우저 언어와 동일한 기본 언어 코드로 설정하고, 표시 UI도 같은 정규화 규칙을 사용한다.

## 목적

사용자가 최초 방문했을 때 브라우저 언어와 i18n 저장값을 일치시키고, 실제 번역 언어와 우상단 언어 label이 동일한 기본 언어 코드를 사용하도록 한다.

## 문제

- `src/i18n/i18n.ts`는 `LanguageDetector`를 사용하지만 detector 옵션을 명시하지 않는다.
- `i18next-browser-languagedetector`의 기본 탐색 순서는 `querystring → cookie → localStorage → sessionStorage → navigator → htmlTag`다.
- 기본 localStorage 키는 `i18nextLng`이고, 기본 cache도 `localStorage`다.
- 실제 리소스 선택은 `ko`로 동작할 수 있지만 `i18n.language`에는 `ko-KR`이 남을 수 있다.
- `LanguageSwitcher`는 `ko`/`zh`와 exact match만 처리하고 나머지를 English로 표시한다.
- 지원 언어는 `en`, `ko`, `zh`이며, 브라우저 언어가 `ko-KR`, `zh-CN`처럼 지역 태그를 포함할 수 있다.
- 현재 자동화된 테스트 스크립트나 테스트 파일은 확인되지 않았고, 검증 가능한 명령은 `yarn build`, `yarn lint`다.

## 탐색한 파일 및 근거

| 파일 | 확인 내용 |
| --- | --- |
| `src/i18n/i18n.ts` | detector 등록, resources, `fallbackLng: "en"`, detector 옵션 부재 |
| `src/main.tsx` | React 렌더링 전에 `src/i18n/i18n`을 import하여 i18n 초기화 |
| `src/components/LanguageSwitcher.tsx` | `i18n.language`를 exact match로 비교해 지역 코드가 들어오면 English를 표시하는 문제 |
| `package.json` | `i18next-browser-languagedetector` 의존성, `build`/`lint` 검증 명령, 테스트 스크립트 없음 |
| `node_modules/i18next-browser-languagedetector` | 기본 order, localStorage key, cache 동작 확인 |

## 해결 방법

첫 방문에는 브라우저 언어를 지원 언어 코드로 정규화하여 `i18nextLng`에 기록한다. 이미 사용자가 선택한 저장값은 유지하되 지역 코드만 기본 언어 코드로 정규화한다. `LanguageSwitcher`도 동일한 정규화 함수를 사용한다.

브라우저 언어가 지원 목록에 없으면 `fallbackLng` 정책에 따라 `en`을 사용한다. 초기화 시점은 `src/main.tsx`에서 React 렌더링보다 앞서 실행되는 `src/i18n/i18n.ts` 내부로 한정한다.

## 범위

### 포함

- i18n detector의 초기 언어와 localStorage 동기화
- `ko-KR`, `zh-CN` 등 지역 태그의 지원 언어 정규화
- 첫 방문, 기존 유효값, 기존 무효값, 미지원 브라우저 언어의 동작 정의
- build/lint 및 수동 브라우저 검증

### 제외

- 번역 리소스 문구 수정
- 언어 선택 UI의 언어 코드 표시/active 상태 정규화
- 서버/API/라우팅 변경
- 사용자가 이미 선택한 유효 언어를 브라우저 언어로 매 방문마다 덮어쓰기

## 가정 및 확인이 필요한 정책

- `i18nextLng`가 없는 상태를 최초 접근으로 간주한다.
- 저장값이 `en`, `ko`, `zh` 또는 해당 지원 언어의 지역 태그로 해석 가능한 경우 사용자 선택으로 보고 보존한다.
- 사용자가 원할 경우 브라우저 언어를 매 방문마다 강제하는 정책으로 바꿀 수 있으나, 현재 요청의 “최초” 조건과 언어 선택 UI의 존재를 고려해 첫 방문 동기화를 권장한다.
