FROM node:10

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli@1.7.1

COPY . .

EXPOSE 8080

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "8080"]