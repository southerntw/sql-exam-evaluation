import { db } from "../config/db";

import { NewQuestion } from "../models/Question";

export async function getQuestions() {
  return await db.selectFrom("question").selectAll().execute();
}

export async function createQuestion(question: NewQuestion) {
  return await db
    .insertInto("question")
    .values(question)
    .returningAll()
    .executeTakeFirstOrThrow();
}
