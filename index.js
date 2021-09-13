#! /usr/bin/env node

// This is hashbang comment this is used to tell the shell environment
// that when the program is executed which program to handover this ,
// which in our case is NodeJS.
// we give the path of the node here.But because diff environment
// have diff places where node installed so we use env path instead
// of absolute path
// By the time this program executed the #! line is cleared out

"use Strict";
var path = require("path");
var fs = require("fs");
var minimist = require("minimist");
var stdin = require("get-stdin");
// we are requiring this get-stdin because different shells handle stdin in different way so
// its hard to work with these differences thatswhy we are importing this package

// process.argv is used to get an array of the arguments that passed during execution
// but this doesn't do neccessary parsing required like --hello=World to hello:World or -c9 to c:9
// to do this parsing we use a package minimist which is most popular and preinstalled in node

var args = minimist(process.argv.slice(2), {
  boolean: ["help", "in"],
  string: ["file"],
});
// $ node example/parse.js -a beep -b boop
// { _: [], a: 'beep', b: 'boop' }
// _ is for overflow that minimist couldn't understand

if (args.help) {
  printHelp();
} else if (args.in || args._.includes("-")) {
  // TODO take std in
  stdin().then(processFile).catch(printError);
} else if (args.file) {
  var contents = fs.readFile(path.resolve(args.file), (err, contents) => {
    if (err) {
      printError(err.toString());
    } else {
      contents = contents.toString();
      processFile(contents);
    }
  });
} else {
  printError("Incorrect Usage.", true);
}

// *********************************

function processFile(contents) {
  //   var contents = fs.readFileSync(filepath);
  //   This above function will create a buffer and if you pass the contents to
  // the console.log it will do the strigification of the buffer and produce an strange
  // output string like "<buffer> 01 94 49 66 79 12" instead of "Hello world" , this is because the console.log
  // is a wrapper on the process.write , if you display the contents using process.write instead of the console.log
  // it don't do the stringification but provide the buffer directily to the shell and the shell will translate
  // the buffer and give the output "Hello World".
  //   console.log(contents);
  contents = contents.toUpperCase();
  process.stdout.write(contents);
}

// ****************** Help Section **************************

function printError(msg, includeHELP = false) {
  console.error(msg);
  if (includeHELP) {
    console.log("");
    printHelp();
  }
}

function printHelp() {
  console.log("indes.js usage");
  console.log(" index.js --help");
  console.log("");
  console.log("--help                            print this help");
  console.log("--file={FILENAME}                 process the file");
  console.log("--in,-                            process stdin");
  console.log("");
}
