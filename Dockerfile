FROM node:16-buster

WORKDIR /app
RUN apt-get update && apt-get install -y \
  build-essential \
  cmake \
  git \
  g++ \
  libstdc++6

COPY . /app/your-web-service-repo

WORKDIR /app/your-web-service-repo
RUN npm install

WORKDIR /app
RUN git clone https://github.com/sQeeZ-scripting-language/lexer.git

RUN rm -f /app/lexer/CMakeLists.txt
COPY cmake/lexer.txt /app/lexer/CMakeLists.txt

WORKDIR /app/lexer
RUN npm install
RUN npx cmake-js compile --CDNODE=true

WORKDIR /app/your-web-service-repo

RUN mkdir -p /app/your-web-service-repo/napi
RUN mv /app/lexer/build/Release/sQeeZ-Lexer-Node.node /app/your-web-service-repo/napi/

WORKDIR /app/your-web-service-repo

CMD ["npm", "start"]
