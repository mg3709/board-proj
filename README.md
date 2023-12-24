<div align=center><h1>📚STACKS</h1></div>

<div align=center>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
</br>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">
  <img src="https://img.shields.io/badge/scss-CC6699?style=for-the-badge&logo=sass&logoColor=white">
</br>
  <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=sass&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/aws-EB9A1E?style=for-the-badge&logo=amazon-aws&logoColor=white">
  <img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white">
</div>

<h2>🎬 프로젝트 소개</h2>

**<독후감 / 게시판 프로젝트>**

◽ 읽은 책의 정보를 공유하고 댓글을 통해서 다양한 의견들을 주고 받을 수 있습니다.

◽ 책의 정보만 공유하는 것이 아니고 자유게시판 / 실시간 채팅을 이용해 대화를 나눌 수 있습니다.

◽ 인기있는 글들을 홈에서 볼 수 있도록 합니다.

◽ 배포 주소 : http://board-example.com/

<h2>🎬 설계 주안점</h2>

<p>1. 독후감 / 자유게시판에 글을 올리고 조회 할 수 있는 기능 제공</p>
<p>2. 조회한 게시글에 댓글을 달 수 있는 기능 제공</p>
<p>3. 내 로컬파일에서 게시글로 사진을 업로드 할 수 있는 기능 제공</p>
<p>4. Framer-motion을 이용한 화면간 이동시 애니메이션 추가</p>
<p>5. 각 카테고리의 가장 인기있는 상위 3개의 게시글들을 홈 화면에 출력</p>
<p>6. Socket을 이용한 실시간 채팅 구현</p>
<p>7. aws 의 ec2 에 nginx를 사용해 업로드</p>
<p>8. React-Query 를 사용해 지속적으로 동기화</p>

<h2>🎬 구현 기능</h2>

- 홈
   
   - nav bar 삽입
   - 각 카테고리 상위 3개의 글 출력

- introduce 페이지
  
  - 웹사이트에 대한 설명들이 적혀 있는 페이지
   
- book 페이지

  - book 카테고리에 있는 모든 글들을 출력
  - 글들을 눌러서 자세히 보기 페이지로 이동
  - 자세히 보기 페이지에 해당 글에 대한 자세한 정보들 출력
  - 해당 글에 댓글 첨부 가능
  
- board 페이지

  - board 카테고리에 있는 모든 글들을 출력
  - 글들을 눌러서 자세히 보기 페이지로 이동
  - 자세히 보기 페이지에 해당 글에 대한 자세한 정보들 출력
  - 해당 글에 댓글 첨부 가능
    
- write 페이지

  - 게시글을 쓸 수 있는 기능 제공
  - book / board 버튼으로 쓰고 싶은 카테고리 지정
  - 내 로컬에서 이미지 업로드
    
- chat 페이지

  - socket 을 이용한 실시간 채팅 기능
    
<h2>🎬 개발환경</h2>

◽ OS : <img src="https://img.shields.io/badge/windows 10-0078D6?style=for-the-badge&logo=windows10&logoColor=white" align=center>

◽ IDE : <img src="https://img.shields.io/badge/vs code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" align=center>

◽ Language : <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" align=center> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" align=center>

◽ FrontEnd : <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white" align=center> <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white" align=center>

◽ FrameWork / Library : <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" align=center> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white" align=center>

◽ DB : <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=sass&logoColor=white" align=center>

<h2>🎬 사용 라이브러리</h2>

- BackEnd
```
yarn add body-parser
yarn add cors
yarn add express
yarn add mongodb
yarn add multer
yarn add path
yarn add socket.io
```

- FrontEnd
```
yarn add @tanstack/react-query
yarn add axios
yarn add framer-motion
yarn add mongodb
yarn add react-router-dom
yarn add sass
yarn add socket.io-client
```
