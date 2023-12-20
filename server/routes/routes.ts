import { Response, Router, Request } from "express";

import * as Repository from "../repository/Repository";

const router = Router();

router.get("/questions", (req: Request, res: Response) => {
  Repository.getQuestions()
    .then((question) => {
      console.log("successfully getting all questions from repository");
      console.log(question);
      res.json(question);
    })
    .catch((error) => {
      console.error("Error getting questions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

export default router;
