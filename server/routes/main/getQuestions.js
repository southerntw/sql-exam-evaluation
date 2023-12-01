const mysql = require('mysql');

const getQuestions = (req, res, next) => {
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

        res.send(questions);
    })
};

module.exports = getQuestions;