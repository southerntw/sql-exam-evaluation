var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "classicmodels"
});

var query1 = "SELECT customerName, addressLine1 FROM customers";
var query2 = "SELECT * FROM customers";

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  // As it stands now, the evaluation is black and white. If the value is different just a little, it's gonna say it's wrong.
  con.query(query1, function (err, result1, fields1) {
    if (err) throw err;
    const resultString1 = JSON.stringify(result1);

	con.query(query2, function (err, result2, fields2) {
	    if (err) throw err;
	    const resultString2 = JSON.stringify(result2);

	    console.log("Query benar: %dr x %dc", result1.length, fields1.length);
	    console.log("Query jawaban: %dr x %dc", result2.length, fields2.length);

	    if (areResultsEqual(result1, result2)) {
	    	console.log("Results are the same");
	    } else {
	    	console.log("Results are not the same");
	    }
	  });
  });
});

function areResultsEqual(result1, result2) {
  if (result1.length !== result2.length) {
    return false;
  }

  for (let i = 0; i < result1.length; i++) {
    const row1 = result1[i];
    const row2 = result2.find(r => areRowsEqual(row1, r));

    if (!row2) {
      return false;
    }
  }

  return true;
}

function areRowsEqual(row1, row2) {
  const values1 = Object.values(row1);
  const values2 = Object.values(row2);

  if (values1.length !== values2.length) {
    return false;
  }

  for (let i = 0; i < values1.length; i++) {
    if (values1[i] !== values2[i]) {
      return false;
    }
  }

  return true;
}