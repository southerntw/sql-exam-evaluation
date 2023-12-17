import { Request, Response } from "express";
import Questions from "../models/Questions.js";

const getQuestions = async (res: Response) => {
  try {
    const questions = await Questions.findAll({
      attributes: ["questionId", "difficulty", "groupGroupId"],
    });
    res.json(questions);
  } catch (error) {
    console.log(error);
  }
};

const getQuestion = async (req: Request, res: Response) => {
  try {
    const questionId = req.body.questionId;
    const question = await Questions.findOne({
      attributes: [
        "questionId",
        "difficulty",
        "text",
        "correctAnswer",
        "groupGroupId",
      ],
      where: {
        questionId: questionId,
      },
    });
    res.json(question);
  } catch (error) {
    console.log(error);
  }
};

export default { getQuestions, getQuestion };
