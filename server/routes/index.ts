import {
  getUsers,
  Register,
  Login,
  Logout,
} from "../controllers/UsersControllers";
import QuestionController from "../controllers/QuestionsControllers";
import { verifyToken } from "../middleware/VerifyToken";
import { refreshToken } from "../controllers/RefreshToken";
import { compareQuery } from "../controllers/AnswersControllers";

const router = require("express").Router();
const { getQuestions, getQuestion } = QuestionController; // TODO: Implement getQuestion, possibly

// Auth routes
router.post("/users", Register);
router.post("/login", Login);
router.delete("/logout", Logout);
router.get("/token", refreshToken);

// Main routes
router.get("/questions", getQuestions);
router.post("/compare", compareQuery);

export default router;
