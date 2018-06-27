const getLessImportCompiler = require("./import-compiler");
const usage = require("./usage");
const parseOptions = require("./parse-options");

function LessImportCompiler(options) {
  this.options = options;
}

LessImportCompiler.prototype = {
  install   : function (less, pluginManager) {
    const NpmFileManager = getLessImportCompiler(less);
    pluginManager.addFileManager(new NpmFileManager(this.options));
  },
  printUsage: function () {
    usage.printUsage();
  },
  setOptions: function (options) {
    this.options = parseOptions(options);
  },
  minVersion: [2, 1, 1]
};

module.exports = LessImportCompiler;
