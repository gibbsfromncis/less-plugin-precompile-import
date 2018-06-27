module.exports = {
    printUsage: function() {
        console.log("");
        console.log("Less Precompile Import Plugin");
        console.log("specify plugin with --import-precompile");
        this.printOptions();
        console.log("css/less extensions not necessary");
        console.log("");
    },
    printOptions: function() {
      console.log("we support the following options... 'prefix'");
    }

};
