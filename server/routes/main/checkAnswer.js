const mysql = require('mysql');
const areResultsEqual = require('../../utils/areResultsEqual');

const checkAnswer = (req, res, next) => {

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
    });

    const query3 = `SELECT jawaban FROM questions WHERE id = '${questionId}'`;

    con_questions.query(query3, function(err, result, fields) {
        if (err) {
            return next(err);
        }

        let query1 = result[0].jawaban

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
}

module.exports = checkAnswer;