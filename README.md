# sQeeZ Napi Webservice
This is a modular Node.js-based web service for access to the sQeeZ-Scripting-Language

- **Lexer**: Tokenizes input string.
- **Parser**: Parses tokens into an Abstract Syntax Tree (AST).
- **Interpreter**: Interprets the AST and logs output.

The web service provides access to `.node` files compiled from native C++ code via Node-API (N-API). Each module ([lexer](http://github.com/sQeeZ-scripting-language/lexer), [parser](http://github.com/sQeeZ-scripting-language/parser), [interpreter](http://github.com/sQeeZ-scripting-language/interpreter)) wraps logic from its own C++ repository.

## API Endpoints

| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| GET | `/` | Welcome |
| GET | `/api` | Swagger Docs |
| GET | `/api/lexer` | Ping Lexer |
| GET | `/api/parser` | Ping Parser |
| GET | `/api/interpreter` | Ping Interpreter |
| POST | `/api/lexer/tokenize` | Tokenizes input string |
| POST | `/api/parser/parse` | Parse Tokens into AST |
| POST | `/api/interpreter/interpret` | Interprets the AST |

## Deployment
The project includes a Dockerfile that can be built using the provided commands. The image is pushed to a registry, making it ready for use in different environments.

```bash
docker buildx create --use
docker login
docker buildx build \
  --platform linux/amd64 \
  -t marcelnoehre/sqeez-webservice:latest \
  . \
  --push
```