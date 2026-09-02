# SCP FRIEND DATABASE — Firebase 실시간 사이트

## 현재 기능
- ☰ 왼쪽 메뉴
- 1~4세대
- 세대 → SCP 목록 → 상세정보
- 세계관 / 실시간 티어표 / 사건 기록 / 업데이트 기록
- Firebase Realtime Database 실시간 동기화
- Firebase Authentication 이메일/비밀번호 관리자 로그인
- 관리자: SCP 추가/수정/삭제, 티어표 수정, 세계관 수정, 사건 추가/수정/삭제

## Firebase 연결
`firebase-config.js`에는 이미 SCP-data 웹 앱 설정이 들어 있습니다.

## 관리자 로그인
Firebase Console에서 만든 이메일/비밀번호 계정으로 `admin.html`에 로그인합니다.
사이트 코드에는 관리자 비밀번호를 저장하지 않습니다.

## ⭐ 마지막 보안 설정 (공개 전 반드시)
`database.rules.json`의 `YOUR_ADMIN_EMAIL_HERE`를 Firebase Authentication에서 만든 관리자 계정의 이메일로 바꾼 뒤, Firebase Console의 Realtime Database → Rules에 같은 내용을 붙여넣고 게시하세요.

현재 규칙은:
- 누구나 사이트 데이터 읽기 가능
- Firebase에 로그인한 지정 관리자 이메일만 데이터 쓰기 가능

Firebase Security Rules가 실제 서버에서 읽기/쓰기 권한을 검사하므로, 브라우저의 관리자 화면만 숨기는 것보다 안전합니다.

## GitHub Pages
GitHub 저장소에 파일을 올린 뒤 Settings → Pages에서 배포하면 친구들에게 링크를 보낼 수 있습니다.
