FROM node:18.19.0-alpine


WORKDIR /usr/app


COPY package*.json ./

RUN npm install

COPY .env.example .env

COPY src/infrastructure/mysql/prisma /usr/app/prisma

COPY . .


RUN npx prisma generate --schema ./prisma/schema.prisma


EXPOSE 3000


CMD ["npm", "start"]
