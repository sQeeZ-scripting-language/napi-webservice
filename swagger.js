const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js', './controllers/lexer-controller.js', './controllers/parser-controller.js', './controllers/interpreter-controller.js'];

swaggerAutogen(outputFile, endpointsFiles);