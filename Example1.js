const { Console } = require("console");
const http = require("http");
const express = require("express");
const sql = require("mssql/msnodesqlv8");
const { connect } = require("http2");
//Getting the connection as a function to connect with the database
var myconnection = require("./Connection")();
var bodyParser = require("body-parser"); // Required for Parsin Json body in post request

//Create an express App
const app = express();

//app.use(myParser.urlencoded({extended : true}));
// create application/json parser to read Json from the post method
var jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//Get function to read the about page

app.get("/about", function (req, res) {
    console.log("This is about page");
    //res.send is to share the data on the Web Portal
    res.send("This is the app response");
})

app.get("/data", function (req, res) {
    //console.log("This is about page");
    //res.send("This is the app response");
//To read the data from the database    
    myconnection.connect().then(function(){

        var myquery = "select * from Students";

        //Create a request to connect the database
        var myrequest = new sql.Request(myconnection);
        myrequest.query(myquery).then(function(recordset){

            res.json(recordset.recordset);

            con.close();

        }).catch(function(error){
            res.status(400).send("No data found");
            console.log(error);
            con.close();
        });

    }).catch(function(error){

        res.status(400).send("Connection failed");
        console.log(error);
            
    });
})


app.get("/data/:myid", function (req, res) {
    //console.log("This is about page");
    //res.send("This is the app response");
    myconnection.connect().then(function(){

        var id = req.params.myid;
        var myrequest = new sql.Request(myconnection);
        myrequest.input("PersonId",sql.Int,id)
        var myquery = "select * from Students where id = @PersonId";
        myrequest.query(myquery).then(function(recordset){

            res.json(recordset.recordset);

            con.close();

        }).catch(function(error){
            res.status(400).send("No data found");
            console.log(error);
            con.close();
        });

    }).catch(function(error){

        res.status(400).send("Connection failed");
        console.log(error);
            
    });
})




//Parsing data using Post request, add a jSon parser separately
app.post("/datapost",jsonParser,function (req, res) {
    //console.log("This is about page");
    //res.send("This is the app response");
    //field name should be same as in the Json 
     
    //console.log("req"+req.body);
    myconnection.connect().then(function(){
        var myid = req.body.id;//id field was defined inside the Json Parser
        var myname = req.body.name;
        var myrequest = new sql.Request(myconnection);
        myrequest.input("PersonId",sql.Int,myid)
        myrequest.input("PersonName",sql.VarChar,myname)
        
        var myquery = "select * from Students where id = @PersonId or name = @PersonName";
        myrequest.query(myquery).then(function(recordset){

            res.json(recordset.recordset);
            con.close();
        
        }).catch(function(error){
            res.status(400).send("No data found");
            console.log(error);
            con.close();
        });

    }).catch(function(error){

        res.status(400).send("Connection failed");
        console.log(error);
            
    });
})


app.post("")
app.listen(8081, "localhost", () => {

    console.log("The app is listening")
});

//Create server

//const server = http.createServer((req, res) => { res.end("The first server"); })
//server.listen(8080, "localhost", () => { console.log("The port is listening") });