# Lucent Management MVP

Vite + React + TypeScript + Tailwind CSS + Supabase 로 구현한 "Lucent Management" 웹사이트 MVP 입니다.

## 실행 방법
1. 저장소 루트에 `.env` 파일을 생성하고 아래 값을 넣습니다.
```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```
2. 의존성 설치
```
npm install
```
3. 개발 서버 실행
```
npm run dev
```
4. 프로덕션 빌드
```
npm run build
```

## 주요 라우트
- `/` 홈
- `/projects`, `/projects/miruru`, `/projects/drips`
- `/goods`, `/goods/miruru`
- `/login`, `/signup`, `/mypage`
- `/terms`, `/privacy`
- `/admin`, `/admin/orders`

## Supabase 설정
`supabase.sql` 파일에 테이블/정책/시드 SQL과 관리자 등록 가이드를 포함했습니다.
