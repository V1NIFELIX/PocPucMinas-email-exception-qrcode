FROM node:12.19.0-stretch

WORKDIR /email-exception-qr-code/src/app

COPY . .

RUN rm -rf node_modules/

RUN npm install

RUN npm run build

EXPOSE 6060

RUN npm install -g concurrently

CMD ["concurrently","node dist/main"]