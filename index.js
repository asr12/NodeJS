console.log("Hello world");
//Download file system modules
const fs = require ("fs"); 
fs.writeFileSync("DEmoText.txt", "This is a new line from index");

//Filepath module
const path = require("path");
//var fileName = "DEmoText.txt";

var FilePath = path.join(__filename);

console.log(FilePath);

var BaseName = path.basename(FilePath);

console.log(BaseName);

var extension = path.extname(BaseName);

console.log(extension);

const superheroes = require("superheroes");

console.log(superheroes.random());

//console.log(fs.read("C://CVS-Automation//Notes.txt"));

fs.readFileSync("DEmoText.txt"));