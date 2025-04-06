const interpreter = require('../services/interpreter-service');

function ping(req, res) {
  try {
    const result = interpreter.ping();
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function interpret(req, res) {
  try {
    const input = req.body;
    const result = interpreter.interpret(input);
    res.json({ result: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function registerRoutes(app) {
  app.get('/api/interpreter', ping);
  app.post('/api/interpreter/interpret', interpret);
}

module.exports = {
  registerRoutes
};
