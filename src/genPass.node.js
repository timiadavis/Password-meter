// THIS SCRIPTS REQUIRES NODE JS, TO RUN THIS, TYPE "node ./genPass.node.js"

var fs = require("fs");

function isNotEmpty(line) {
  return Boolean(line.length);
}

var lines = fs
  .readFileSync("./1000-most-common-passwords.txt")
  .toString()
  .split("\n");
var result = lines.filter(isNotEmpty);
var json = JSON.stringify(result, null, 2);
fs.writeFileSync("./password.json", json);
