const Users = require('../models/Users.js');
const Answers = require('../models/Answers.js');
const Questions = require('../models/Questions.js');
const areResultsEqual = require('../utils/areResultsEqual');
const mysql = require('mysql');

const compareQuery = async(req, res) => {
	try {
		const answer = req.body.answer;
		let isCorrect = false;
		const user = req.body.userId;
		const question = req.body.questionId;

		// Database used on Exam
		const examdb = mysql.createConnection({
	        host: "localhost",
	        user: "root",
	        password: "",
	        database: "sakila", // change according to needs.
	        charset: 'utf8mb4',
	    });

		examdb.connect(function(err) {
			if (err) {
				return next(err);
			}
		})

		const answerData = await Questions.findOne({
            attributes:['correctAnswer'],
            where: {
            	questionId: question
            }
        });
        const correctAnswer = answerData.correctAnswer;

        let response;

        examdb.query(correctAnswer, async function(err, dbAnswer, fieldsdb) {
        	if (err) {
                    console.log("[D] Error Caught");
                    console.log(err.message);    
                    return next(err);
            }

            examdb.query(answer, async function(err, studentAnswer, fieldsStudent) {
            	if (err) {    
                    return next(err.message);
                }

                examdb.end()

                dbAnswer.forEach(row => {
                        for (const key in row) {
                            if (Buffer.isBuffer(row[key])) {
                                row[key] = row[key].toString('utf8');
                            }
                        }
                });

                studentAnswer.forEach(row => {
                        for (const key in row) {
                            if (Buffer.isBuffer(row[key])) {
                                row[key] = row[key].toString('utf8');
                            }
                        }
                });

                const resultString1 = JSON.stringify(dbAnswer);
                const resultString2 = JSON.stringify(studentAnswer);
                const [columnSame, valuesSame] = areResultsEqual(dbAnswer, studentAnswer);

                response = {
                        query1: {
                            rows: dbAnswer.length,
                            columns: fieldsdb.length,
                            data: dbAnswer,
                        },
                        query2: {
                            rows: studentAnswer.length,
                            columns: fieldsStudent.length,
                            data: studentAnswer,
                        },
                };

                if (columnSame && valuesSame) {
                        response.message = "Nama kolom dan isi tabel sama";
                        response.status = "Correct";
                        isCorrect = true;
                    } else if (columnSame && !valuesSame) {
                        response.message = "Isi tabel berbeda";
                    } else if (!columnSame && valuesSame) {
                        response.message = "Nama kolom berbeda";
                    } else {
                        response.message = "Isi tabel dan nama kolom berbeda";
                 }

		        await Answers.upsert({
		                 	answer: answer,
		                 	isCorrect: isCorrect,
		                 	userUserId: user,
		                 	questionQuestionId: question
		        });

		        res.json(response);

            });
        });
	} catch (error) {
		console.log(`[E] ${error}`);
	}
}

module.exports = compareQuery;