FROM node:latest

WORKDIR /usr/api

COPY . .
RUN npm install --save

EXPOSE 3000

ENTRYPOINT [ "node", "index.js" ]