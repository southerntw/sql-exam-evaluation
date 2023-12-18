import { Response, Router } from "express";

import * as Repository from "../repository/Repository";

const router = Router();

router.get("/questions", (res: Response) => {
  Repository.getQuestions().then((questions) => {
    console.log("successfully getting all questions from repository");
    res.json(questions);
  });
});

export default router;
