const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const port = 3001;
const bodyParser = require('body-parser');

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

const app = express();

app.use(express.static('public'));

app.get('/questions', (req, res, next) => {
    const con_questions = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "exam"
    });

    con_questions.connect(function(err) {
        if (err) {
            return next(err);
        }
        console.log('connected!');
    });

    con_questions.query('SELECT * FROM questions', function(err, result, fields) {
        if (err) return next(err);

        const questions = {
            questions: result
        };

        const questionString = JSON.stringify(questions, null, 2);
        fileWrite('./.temp/output.json', `${questionString}`);

        res.send(questions);
    })
});

app.use(express.json());

app.post('/compare', (req, res, next) => {

    console.log("[D]:", req.body);
    console.log("[D]: /compare accessed");
    console.log("[D]:", req.body.questionId);
    console.log("[D]:", req.body.query2);

    const questionId = req.body.questionId;
    const query2 = req.body.query2;

    const con_questions = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "exam",
        charset: 'utf8mb4',
    });

    const con_classicmodels = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "sakila",
        charset: 'utf8mb4',
    });


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

        let query1 = "";

        try {
            query1 = result[0].jawaban
        } catch (error) {
            return next("Question ID tidak ditemukan.")
        }
        

        con_classicmodels.connect(function(err) {
            if (err) {    
                console.log("[D] Error Caught");
                console.log(err.message);
                return next(err);
            }
            console.log("Connected!");

            con_classicmodels.query(query1, function(err, result1, fields1) {
                if (err) {
                    console.log("[D] Error Caught");
                    console.log(err.message);    
                    return next(err);
                }

                con_classicmodels.query(query2, function(err, result2, fields2) {
                    if (err) {
                        
                        return next(err.message);
                    }

                    result1.forEach(row => {
                        for (const key in row) {
                            if (Buffer.isBuffer(row[key])) {
                                row[key] = row[key].toString('utf8');
                            }
                        }
                    });

                    result2.forEach(row => {
                        for (const key in row) {
                            if (Buffer.isBuffer(row[key])) {
                                row[key] = row[key].toString('utf8');
                            }
                        }
                    });

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

                    const [columnSame, valuesSame] = areResultsEqual(result1, result2)
                    output.status = "Wrong";

                    if (columnSame && valuesSame) {
                        output.message = "Nama kolom dan isi tabel sama";
                        output.status = "Correct";
                    } else if (columnSame && !valuesSame) {
                        output.message = "Isi tabel berbeda";
                    } else if (!columnSame && valuesSame) {
                        output.message = "Nama kolom berbeda";
                    } else {
                        output.message = "Isi tabel dan nama kolom berbeda";
                    }
                    
                    res.send(output);
                });
            });
        });
    });
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.json({
        error: err
    });
});

function areResultsEqual(result1, result2) {
    let columnSame = true;
    let valuesSame = true;


    if (result1.length !== result2.length) {
        valuesSame = false;
    }


    for (let i = 0; i < result1.length; i++) {
        const values1 = Object.values(result1[i]);
        const matchingRow = result2.find(row => {
            const values2 = Object.values(row);
            return JSON.stringify(values1) === JSON.stringify(values2);
        });

        if (!matchingRow) {
            valuesSame = false;
        }
    }


    if (JSON.stringify(Object.keys(result1[0] || {})) !== JSON.stringify(Object.keys(result2[0] || {}))) {
        columnSame = false;
    }

    return [columnSame, valuesSame];
}

function fileWrite(filePath, resultString) {
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