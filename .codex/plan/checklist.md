# Checklist

## Phase 1. Context 및 정책 확정

- [x] 현재 브랜치와 working tree 확인
- [x] i18n 초기화 및 detector 기본 동작 확인
- [x] 지원 언어와 fallback 정책 확인
- [x] 구현 범위와 제외 범위 정리
- [x] 첫 방문 동기화 및 사용자 선택 보존 정책 결정

## Phase 2. 구현

- [x] `src/i18n/i18n.ts`에 브라우저/저장 언어 정규화 로직 추가
- [x] 최초 또는 무효 저장값일 때 `i18nextLng`를 결정 언어로 기록
- [x] detector localStorage key/cache 옵션 명시
- [x] `LanguageSwitcher`가 지역 언어 코드를 기본 언어 코드로 표시하도록 수정
- [x] 본문 번역과 우상단 label이 같은 언어로 표시되는지 확인
- [x] 유효한 사용자 선택을 유지하는지 확인

## Phase 3. 검증

- [x] `yarn lint`
- [x] `yarn build`
- [x] 별도 포트의 새 origin에서 storage가 없는 상태로 브라우저 `ko-KR` 최초 접근
- [ ] localStorage가 없는 상태에서 브라우저 `zh-CN`으로 최초 접근
- [ ] 미지원 브라우저 언어에서 `en` fallback 확인
- [ ] 기존 `i18nextLng=ko` 또는 `zh`가 유지되는지 확인
- [ ] 기존 무효 저장값이 브라우저 언어 또는 `en`으로 교정되는지 확인
- [x] LanguageSwitcher로 영어/한국어를 변경하고 새로고침 후 유지되는지 확인
- [x] 본문이 한글이고 지역 언어 코드가 감지된 상태에서 우상단이 `한국어`인지 확인

## Phase 4. 완료

- [x] `git diff --check`
- [x] `git status --short --branch`로 의도하지 않은 변경 확인
- [x] 구현 변경과 검증 결과 사용자 보고
- [ ] 사용자 승인 후 커밋/PR 준비

## 후속 TestCode PR

- [ ] 후속 TestCode PR: i18n 초기 언어 결정 로직 자동화 테스트
  - 목적: 첫 방문, 저장값 우선, 지역 태그 정규화, fallback, 사용자 선택 보존을 자동 검증
  - 진행 조건: 원본 작업 완료, 원본 작업 commit/PR 준비 완료, 사용자 TestCode 작업 요청
  - PR 기준: 원본 작업 브랜치를 base로 별도 브랜치/별도 PR 생성
  - 상세 계획: 현재 테스트 프레임워크가 없어 `.codex/plan/test-code-plan.md`는 생성하지 않음. 테스트 프레임워크 도입 여부를 별도 결정 후 작성
