const fs = require('fs');
const path = require('path');
const win32 = process.platform === 'win32';
const PromiseConstructor = typeof Promise === 'undefined' ? require('promise') : Promise;

module.exports = function (less) {
  const FileManager = less.FileManager;

  function ImportCompiler(options) {
    this.options = options || {};

    if (this.options.prefix === undefined) {
      this.options.prefix = 'precompile://';
    }
  }

  ImportCompiler.prototype = new FileManager();

  ImportCompiler.prototype.supports = function (filename, currentDirectory) {
    const prefixRegexp = new RegExp('^' + this.options.prefix, 'i');
    return filename.match(prefixRegexp) || currentDirectory.match(prefixRegexp);
  };

  ImportCompiler.prototype.supportsSync = ImportCompiler.prototype.supports;

  ImportCompiler.prototype.loadFile = function (filename, currentDirectory, options, environment) {

    try {
      filename = filename.replace(this.options.prefix, "");

      currentDirectory = currentDirectory.replace(this.options.prefix, "");

      currentDirectory = path.resolve(currentDirectory);

      filename = path.resolve(currentDirectory, filename);
    }
    catch (e) {
      return new PromiseConstructor(
        function (fullfill, reject) {
          reject(e);
        }
      );
    }

    return new PromiseConstructor((resolve) => {

      const content = fs.readFileSync(filename).toString();

      less.render(content, { filename: path.resolve(filename) }, function (e, data) {

        resolve({
          filename: filename,
          contents: data.css
        })
      })

    });

  };

  ImportCompiler.prototype.tryAppendExtension = function (path) {
    return path;
  };

  ImportCompiler.prototype.tryAppendLessExtension = function (path) {
    return path;
  };

  return ImportCompiler;
};
