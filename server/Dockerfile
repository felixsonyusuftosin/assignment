FROM node:17-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY .env.example .env

COPY package*.json  ./

COPY ./ .


RUN npm install

RUN npm run seed:drop-all-tables

RUN npm run seed:create-tables


EXPOSE 4010

CMD ["npm", "run", "watch"]