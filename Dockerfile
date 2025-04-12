FROM node:16-buster

WORKDIR /app
RUN apt-get update && apt-get install -y \
  build-essential \
  cmake \
  git \
  g++ \
  libstdc++6

COPY . /app/web-service

WORKDIR /app/web-service
RUN npm install

# Lexer
WORKDIR /app
RUN git clone https://github.com/sQeeZ-scripting-language/lexer.git

RUN rm -f /app/lexer/CMakeLists.txt
COPY cmake/lexer.txt /app/lexer/CMakeLists.txt

WORKDIR /app/lexer
RUN npm install
RUN npx cmake-js compile --CDNODE=true

RUN mkdir build-lexer && \
    cd build-lexer && \
    cmake .. && \
    cmake --build .

# Parser
WORKDIR /app
RUN git clone https://github.com/sQeeZ-scripting-language/parser.git

RUN rm -f /app/parser/CMakeLists.txt
COPY cmake/parser.txt /app/parser/CMakeLists.txt

RUN mkdir -p /app/parser/lexer-lib
RUN cp /app/lexer/build-lexer/libsQeeZ-Lexer-Lib.a /app/parser/lexer-lib/
RUN cp -r /app/lexer/include/lexer /app/parser/include/

WORKDIR /app/parser
RUN npm install
RUN npx cmake-js compile --CDNODE=true

RUN mkdir build-parser && \
    cd build-parser && \
    cmake .. && \
    cmake --build .

# Interpreter
WORKDIR /app
RUN git clone https://github.com/sQeeZ-scripting-language/interpreter.git

RUN mkdir -p /app/interpreter/lexer-lib
RUN cp /app/lexer/build-lexer/libsQeeZ-Lexer-Lib.a /app/interpreter/lexer-lib/
RUN cp -r /app/lexer/include/lexer /app/interpreter/include/

RUN mkdir -p /app/interpreter/parser-lib
RUN cp /app/parser/build-parser/libsQeeZ-Parser-Lib.a /app/interpreter/parser-lib/
RUN cp -r /app/parser/include/parser /app/interpreter/include/

RUN rm -f /app/interpreter/CMakeLists.txt
COPY cmake/interpreter.txt /app/interpreter/CMakeLists.txt

WORKDIR /app/interpreter
RUN npm install
RUN npx cmake-js compile --CDNODE=true









WORKDIR /app/web-service

RUN mkdir -p /app/web-service/napi
RUN mv /app/lexer/build/Release/sQeeZ-Lexer-Node.node /app/web-service/napi/

WORKDIR /app/web-service

CMD ["npm", "start"]
