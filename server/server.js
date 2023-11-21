const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const port = 3001;

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

const app = express();
app.use(express.static('public'));

app.get('/api', (req, res) => {
    res.send("You have reached the API!");
});

app.get('/compare', (req, res, next) => {
    const con_questions = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "exam"
    });

    const con_classicmodels = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "classicmodels"
    });

    const questionId = req.query.questionId;
    const query2 = req.query.query2;

    con_questions.connect(function(err) {
        if (err) {
            return next(err);
        }
        console.log("Connected!");
    });

    const query3 = `SELECT jawaban FROM questions WHERE id = '${questionId}'`;

    con_questions.query(query3, function(err, result, fields) {
        if (err) {
            return next(err);
        }

        const query1 = result[0].jawaban;

        con_classicmodels.connect(function(err) {
            if (err) {
                return next(err);
            }
            console.log("Connected!");

            con_classicmodels.query(query1, function(err, result1, fields1) {
                if (err) {
                    return next(err);
                }

                con_classicmodels.query(query2, function(err, result2, fields2) {
                    if (err) {
                        return next(err.message);
                    }

                    const resultString1 = JSON.stringify(result1);
                    const resultString2 = JSON.stringify(result2);

                    let output = {
                        query1: {
                            rows: result1.length,
                            columns: fields1.length,
                            data: result1,
                        },
                        query2: {
                            rows: result2.length,
                            columns: fields2.length,
                            data: result2,
                        },
                    };

                    if (resultString1 === resultString2) {
                        console.log("[D] RESULTSTRING: Same<br>");
                    } else {
                        console.log("[D] RESULTSTRING: Different<br>");
                    }

                    if (areResultsEqual(result1, result2)) {
                        output.status = "Same";
                    } else {
                        output.status = "Different";
                    }

                    const outputString = JSON.stringify(output, null, 2);
                    fileWrite('./.temp/output.json', `${outputString}`);

                    res.send(output);
                });
            });
        });
    });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.json({ error: err });
});

function areResultsEqual(result1, result2) {
    if (result1.length !== result2.length) {
        return false;
    }

    for (let i = 0; i < result1.length; i++) {
        const values1 = Object.values(result1[i]);
        const matchingRow = result2.find(row => {
            const values2 = Object.values(row);
            return JSON.stringify(values1) === JSON.stringify(values2);
        });

        if (!matchingRow) {
            return false;
        }
    }

    return true;
}

function fileWrite(filePath, resultString) {
    // Write to the file
    fs.writeFile(filePath, resultString, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log(`Successfully wrote to ${filePath}`);
        }
    });
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
