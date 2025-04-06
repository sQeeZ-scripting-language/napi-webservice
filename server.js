const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const lexer = require('./controllers/lexer-controller');

app.use(express.json());

lexer.registerRoutes(app);

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
