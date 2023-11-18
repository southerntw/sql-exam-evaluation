const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    // Read the content of index.html and send it as the response
    const indexHtml = fs.readFileSync('index.html', 'utf8');
    res.send(indexHtml);
});

app.get('/compare', (req, res) => {
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
        if (err) throw err;
        console.log("Connected!");
    });

    const query3 = `SELECT jawaban FROM questions WHERE id = '${questionId}'`;

    con_questions.query(query3, function(err, result, fields) {
        if (err) throw err;

        const query1 = result[0].jawaban;

        con_classicmodels.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");

            con_classicmodels.query(query1, function(err, result1, fields1) {
                if (err) throw err;

                con_classicmodels.query(query2, function(err, result2, fields2) {
                    if (err) throw err;

                    const resultString1 = JSON.stringify(result1);
                    const resultString2 = JSON.stringify(result2);

                    let output = '';

                    output += `Query benar: ${result1.length} rows x ${fields1.length} columns<br>`;
                    output += `Query jawaban: ${result2.length} rows x ${fields2.length} columns<br>`;

                    if (resultString1 === resultString2) {
                        output += "[D] RESULTSTRING: Same<br>";
                    } else {
                        output += "[D] RESULTSTRING: Different<br>";
                    }

                    if (areResultsEqual(result1, result2)) {
                        output += "Results are the same<br>";
                    } else {
                        output += "Results are not the same<br>";
                    }

                    res.send(output);
                });
            });
        });
    });
});

function areResultsEqual(result1, result2) {
    if (result1.length !== result2.length) {
        return false;
    }

    for (let i = 0; i < result1.length; i++) {
        const row1 = result1[i];
        const row2 = result2.find(r => JSON.stringify(r) === JSON.stringify(row1));

        if (!row2) {
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
