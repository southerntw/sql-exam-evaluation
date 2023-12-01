const getQuestions = require('./main/getQuestions');
const checkAnswer = require('./main/checkAnswer');

const router = require('express').Router();

router.get('/questions', getQuestions);
router.post('/compare', checkAnswer);

module.exports = router;