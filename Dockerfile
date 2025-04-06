FROM node:18-buster

RUN apt-get update && \
    apt-get install -y libstdc++6

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
