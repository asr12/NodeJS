const sql = require("mssql/msnodesqlv8");
/*
var myconnection = function()
{
    var conn = new sql.ConnectionPool({
        
        server: 'ZAPPERLEGION/aliak',
  		port : 1433,
        driver: 'msnodesqlv8',
        database: 'Student',
		options: {
		instanceName: "aliak",`
        trustedConnection : true
        }
    });

        return conn;
    };
*/
var connect =function()
{     var conn = new sql.ConnectionPool({
         
         database: 'Student',

   server: 'ZAPPERLEGION',
   driver: 'msnodesqlv8',
   options: {
     trustedConnection: true
   }
     });

     
    return conn;
    }
module.exports=connect;
