# syntax=docker/dockerfile:1

FROM node:21.5.0-alpine3.18
WORKDIR /app
COPY package.json .
RUN npm i parcel-bundler
RUN npm install
COPY . .
EXPOSE 1234
CMD ["npm", "run", "start"]