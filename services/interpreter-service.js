const addon = require('../napi/sQeeZ-Interpreter-Node');

let interpreter;

function initInterpreter() {
  if (!interpreter) {
    interpreter = new addon.InterpreterNode(require);
  }
  return interpreter;
}

function ping() {
  return initInterpreter().pingInstance();
}

function interpret(input) {
  return initInterpreter().interpret(input.code, input.dev);
}

module.exports = {
  ping,
  interpret
};
