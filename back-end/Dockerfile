# syntax=docker/dockerfile:1

FROM node:current-alpine3.18
RUN npm install -g nodemon
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4006
CMD ["npm", "run", "dev"]
