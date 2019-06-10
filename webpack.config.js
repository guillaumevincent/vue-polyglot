const path = require("path");

module.exports = {
  entry: "./src/polyglot.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "polyglot.min.js",
    library: "Polyglot",
    libraryTarget: "umd"
  }
};
