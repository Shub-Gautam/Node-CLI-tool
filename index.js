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

// process.argv is used to get an array of the arguments that passed during execution
// but this doesn't do neccessary parsing required like --hello=World to hello:World or -c9 to c:9
// to do this parsing we use a package minimist which is most popular and preinstalled in node

var args = require('minimist')(process.argv.slice(2),{
    boolean:["help"],
    string:["file"]
});
// $ node example/parse.js -a beep -b boop
// { _: [], a: 'beep', b: 'boop' }
// _ is for overflow that minimist couldn't understand

if(args.help){
    printHelp();
}else if(args.file){
    var filepath = path.resolve(args.file);
    console.log();
}else{
    printError("Incorrect Usage.",true);
}




// ****************** Help Section **************************

function printError(msg,includeHELP=false){
    console.error(msg);
    if(includeHELP){
        console.log("");
        printHelp();
    }
}

function printHelp () {
    console.log("indes.js usage");
    console.log(" index.js --help");
    console.log("");
    console.log("--help                            print this help");
    console.log("--file={FILENAME}                 process the file");
    console.log("");

}