import { Request, Response, NextFunction } from "express";

import Answers from "../models/Answers";
import Questions from "../models/Questions";
import { areResultsEqual } from "../utils/areResultsEqual";

import mysql from "mysql";

interface CompareResponse {
  query1: {
    rows: number;
    columns: any;
    data: any;
  };
  query2: {
    rows: number;
    columns: any;
    data: any;
  };
  message?: string;
  status?: string;
}

export const compareQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let isCorrect = false;

    const answer = req.body.answer;
    const user = req.body.userId;
    const question = req.body.questionId;

    // Database used on Exam
    const examdb = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "sakila", // change according to needs.
      charset: "utf8mb4",
    });

    examdb.connect(function (err) {
      if (err) {
        return next(err);
      }
    });

    const answerData = (await Questions.findOne({
      attributes: ["correctAnswer"],
      where: {
        questionId: question,
      },
    })) as { correctAnswer: string | null };

    const correctAnswer = answerData?.correctAnswer;

    let response: CompareResponse;

    examdb.query(correctAnswer, async function (err, dbAnswer, fieldsdb) {
      if (err) {
        console.log("[D] Error Caught");
        console.log(err.message);
        return next(err);
      }

      examdb.query(answer, async function (err, studentAnswer, fieldsStudent) {
        if (err) {
          return next(err.message);
        }

        examdb.end();

        dbAnswer.forEach((row: any) => {
          for (const key in row) {
            if (Buffer.isBuffer(row[key])) {
              row[key] = row[key].toString("utf8");
            }
          }
        });

        studentAnswer.forEach((row: any) => {
          for (const key in row) {
            if (Buffer.isBuffer(row[key])) {
              row[key] = row[key].toString("utf8");
            }
          }
        });

        const resultString1 = JSON.stringify(dbAnswer);
        const resultString2 = JSON.stringify(studentAnswer);
        console.log("[D] resultstring1: ", resultString1);
        console.log("[D] resultstring2: ", resultString2);

        const [columnSame, valuesSame] = areResultsEqual(
          dbAnswer,
          studentAnswer,
        );

        response = {
          query1: {
            rows: dbAnswer.length,
            columns: fieldsdb?.length,
            data: dbAnswer,
          },
          query2: {
            rows: studentAnswer.length,
            columns: fieldsStudent?.length,
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
          questionQuestionId: question,
        });

        res.json(response);
      });
    });
  } catch (error) {
    console.log(`[E] ${error}`);
  }
};
