const addon = require('../napi/sQeeZ-Parser-Node');

let parser;

function initParser() {
  if (!parser) {
    parser = new addon.ParserNode(require);
  }
  return parser;
}

function ping() {
  return initParser().pingInstance();
}

function parse(input) {
  return initParser().parse(input.code, input.dev);
}

module.exports = {
  ping,
  parse
};
