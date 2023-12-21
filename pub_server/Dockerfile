FROM node:20

WORKDIR /pub_server
COPY . .

RUN chmod +x ./wait-for-it.sh
RUN npm cache clean --force && npm install && npm install typescript -g
RUN npm run build
