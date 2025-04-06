const lexer = require('../services/lexer-service');

function ping(req, res) {
  try {
    const result = lexer.ping();
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function tokenize(req, res) {
  try {
    const input = req.body;
    const result = lexer.tokenize(input);
    res.json({ tokens: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function registerRoutes(app) {
  app.get('/api/lexer', ping);
  app.post('/api/lexer/tokenize', tokenize);
}

module.exports = {
  registerRoutes,
};
