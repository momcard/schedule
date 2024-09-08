아오님의 기획으로 제작된 스케줄 제작 프로그램입니다.

## 정보

NextJS 14 버전으로 개발하였습니다.

Node.js, npm 환경에서 테스트 완료하였습니다.

## 데모 사이트

항상 열려 있으니 누구나 스케줄을 만들 수 있습니다.

아오 템플릿 [https://ao.onnada.com/](https://ao.onnada.com/)

## 아오 (버튜버)

[https://bj.afreecatv.com/vhzaoadmiral](https://bj.afreecatv.com/vhzaoadmiral)

[https://x.com/VHZ_AO](https://x.com/VHZ_AO)

## 다운로드
리눅스 서버 또는 윈도우에서 가상 머신을 준비하세요.

터미널에서 다음과 같이 clone하고, npm 패키지 설치하는 명령어를 실행합니다.

```bash
git clone https://github.com/momcard/schedule.git .

npm i
```

## 방화벽 허용

3000은 개발, 3001은 운영환경으로 방화벽을 허용해 주세요.

아래는 ufw 예제입니다.

```bash
ufw status
ufw allow 3000
ufw allow 3001
```

## 개발 환경 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 브라우저를 통해 접속하세요.

## 운영 환경 설정

nginx 설정은 아래 예시를 참고해 주세요.

/etc/nginx/conf.d/ao.conf

```bash
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://ao;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

}

upstream ao {
  server 127.0.0.1:3001;
}
```

## 운영 환경 실행

무중단 배포를 위해 [pm2 guide](https://www.npmjs.com/package/pm2) 를 이용합니다.

```bash
npm install pm2 -g

npm run build

pm2 start "npm run start" --name ao

./build.sh
```

## 업데이트 적용

```bash
git pull

./build.sh
```
