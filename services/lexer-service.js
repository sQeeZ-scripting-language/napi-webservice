const addon = require('../napi/sQeeZ-Lexer-Node');

let lexer;

function initLexer() {
  if (!lexer) {
    lexer = new addon.LexerNode(require);
  }
  return lexer;
}

function ping() {
  return initLexer().pingInstance();
}

function tokenize(input) {
  return initLexer().tokenize(input.code, input.dev);
}

module.exports = {
  ping,
  tokenize
};
