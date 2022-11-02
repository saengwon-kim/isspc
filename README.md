<p align="center"><a href="https://isspc.pages.dev"><img src="https://github.com/saengwon-kim/isspc/raw/main/frontend/static/kkampain.png" style="height: 5em; vertical-align:middle;" alt="깜빵집" /></a></p>

<h1 align="center">
깜:빵집
</h1>

<h4 align="center">
SPC의 손길이 닿은 제품과 가게를 알아볼 수 있도록 도와줍니다. 
</h4>
<p align="center">
  <a href="https://github.com/saengwon-kim/isspc/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/saengwon-kim/isspc?style=flat" alt="GitHub">
  </a>
  <a href="https://github.com/saengwon-kim/isspc/actions/workflows/deploy.yml">
    <img src="https://img.shields.io/github/workflow/status/saengwon-kim/isspc/deploy/main?style=flat" alt="GitHub Workflow Status (branch)">
  </a>
  <a href="https://isspc.pages.dev/">
    <img src="https://img.shields.io/website?down_color=lightgrey&down_message=offline&up_color=green&up_message=online&url=https%3A%2F%2Fisspc.pages.dev" alt="status">
  </a>
</p>

## 구성

### 바코드 인식

* 직접 입력: 13자리부터 18자리까지 인식 가능, 숫자 입력 후 찾기 버튼 클릭
* 스캔: 실시간으로 스캔
* 업로드: 사진 파일을 올리거나 직접 촬영 가능, 기본 카메라의 줌 기능 등 활용 가능

### SPC 관련 브랜드 정리

* SPC 브랜드
* SPC 연관 브랜드: 패스트푸드점, 휴게소

## SPC 제품을 추가하고 싶어요! or 잘못된 데이터가 있어요!

확인되지 않는 SPC 제품, 혹은 잘못된 데이터를 발견하셨다면 다음의 순서로 데이터를 추가하실 수 있습니다.

1. [데이터가 저장된 폴더](./backend/db)에서 해당 항목을 확인합니다. 
2. [신고 스프레드시트](https://docs.google.com/spreadsheets/d/10_E7HjyxuOAGmMWtpWt9_w3aXa71RJzjlcKIq9MJqVo/edit?usp=sharing)에서도 확인합니다.
3. [신고 페이지](https://docs.google.com/forms/d/e/1FAIpQLSdr1TjcPBSri35YsGrqcraFvvcDMHfxQecyDqA7xbK8feNZ-g/viewform?usp=sf_link)에서 자료와 함께 내용을 신고합니다.
4. 2에 들어가 잘 접수되었는 지 확인합니다.

## 관련 자료

### 참고 자료

* [남양유없 프로젝트](https://github.com/NullFull/isnamyang)

### 프론트엔드

* [Gatsby](https://www.gatsbyjs.com): 정적 사이트(static site) 생성
* [LekoArts/gatsby-theme-cara](https://www.gatsbyjs.com/plugins/@lekoarts/gatsby-theme-cara/): 테마
* [ericblade/quagga2](https://github.com/ericblade/quagga2): [업로드로 바코드 인식](./frontend/src/@lekoarts/gatsby-theme-cara/libs/scanner.js)
* [zxing-js/library](https://github.com/zxing-js/library): [스캔으로 바코드 인식](./frontend/src/@lekoarts/gatsby-theme-cara/libs/scanner.js)

### 백엔드

* [Cloudflare Workers](https://developers.cloudflare.com/workers/)

## 참고 사항

* 이 프로젝트는 [남양유없 프로젝트](https://isnamyang.nullfull.kr)에서 영감을 받아 진행되었습니다.  
* 이 프로젝트의 아이디어와 구현의 많은 부분은 [남양유없 프로젝트의 깃허브 저장소](https://github.com/NullFull/isnamyang)를 참고하였음을 밝힙니다.
* 프로젝트의 로고는 [준하트](https://www.instagram.com/0zun_heart0/)님께서 디자인해주셨으며, 저작권은 디자이너님께 있습니다.
* 소스코드는 MIT 라이센스로 배포됩니다.
* 기업 로고의 저작권은 해당 기업에 있습니다.
