const Questions = require('../models/Questions');

const getQuestions = async(req, res) => {
    try {
        const questions = await Questions.findAll({
            attributes:['questionId', 'difficulty', 'groupGroupId']
        });
        res.json(questions);
    } catch (error) {
        console.log(error);
    }
}

const getQuestion = async(req, res) => {
    try {
    	const questionId = req.body.questionId
        const question = await Questions.findOne({
            attributes:['questionId', 'difficulty', 'text', 'correctAnswer', 'groupGroupId'],
            where: {
            	questionId: questionId
            }
        });
        res.json(question);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getQuestions, getQuestion }