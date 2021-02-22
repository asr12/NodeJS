const { Console } = require("console");
const http = require("http");
const express = require("express");
const sql = require("mssql/msnodesqlv8");
const { connect } = require("http2");
var myconnection = require("./Connection");


myconnection.connect().then(function(){

    var myquery = "select * from Students";
    var myrequest = new sql.Request(con);
    myrequest.query(myquery).then(function(myrecordset){

        res.json(recordset.myrecordset);

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
