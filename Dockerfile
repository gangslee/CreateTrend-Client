FROM node:latest

WORKDIR /muna

COPY package.json /muna/
COPY . /muna/
RUN npm install
RUN npm run build