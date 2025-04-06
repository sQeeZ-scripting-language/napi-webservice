const parser = require('../services/parser-service');

function ping(req, res) {
  try {
    const result = parser.ping();
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function parse(req, res) {
  try {
    const input = req.body;
    const result = parser.parse(input);
    res.json({ ast: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function registerRoutes(app) {
  app.get('/api/parser', ping);
  app.post('/api/parser/parse', parse);
}

module.exports = {
  registerRoutes
};
