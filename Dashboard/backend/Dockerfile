FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install express

RUN npm install request

RUN npm install cors

RUN npm install socket.io

COPY . .

EXPOSE 5000

CMD ["node", "serveur.js"]