// const checkAnswer = require('./main/checkAnswer');
const compareQuery = require('../controllers/AnswersControllers');
const UserController = require('../controllers/UsersController');
const QuestionController = require('../controllers/QuestionsControllers');
const { getUsers, Register, Login, Logout } = UserController;
const { getQuestions, getQuestion } = QuestionController;
const verifyToken = require('../middleware/VerifyToken');
const refreshToken = require('../controllers/RefreshToken');

const router = require('express').Router();

// Auth routes
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.delete('/logout', Logout);
router.get('/token', refreshToken);

// Main routes
router.get('/questions', getQuestions);
router.post('/compare', compareQuery);

module.exports = router;