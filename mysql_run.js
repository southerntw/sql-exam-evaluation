var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "classicmodels"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");


  var test = con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log(results[0]);
  });

  con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result[0]);
  });
});