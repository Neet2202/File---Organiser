let helpFunc = require("./commands/help");
let orgFunc= require("./commands/organize");
let treeFunc = require("./commands/tree");
// console.log(helpFunc);
let inputArr = process.argv.slice(2);
console.log(inputArr);
let command = inputArr[0];

// comsole.log(inputArr);
let path = inputArr[1];
switch (command) {
    case "tree":
        //call tree function
        console.log("tree function called and executed succesfully on path " + path);
        treeFunc.tree(path);
        break;
    case "organize":
        //call organize function
        orgFunc.organize(path);
        console.log("organize function called and executed succesfully on path "+ path);
        break;
    case "help":
        //call help function
        helpFunc.help();
        break;
    default:
        console.log("command not recognized :/")
        break;
} 