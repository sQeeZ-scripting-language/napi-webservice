const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const lexer = require('./controllers/lexer-controller');
const parser = require('./controllers/parser-controller');
const interpreter = require('./controllers/interpreter-controller');

app.use(cors());
app.use(express.json());

lexer.registerRoutes(app);
parser.registerRoutes(app);
interpreter.registerRoutes(app);

app.get('/', (req, res) => {
  res.send('Welcome to the sQeeZ-Scripting-Language web service!');
});

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
