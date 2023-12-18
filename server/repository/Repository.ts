import { db } from "../config/db";

import { NewQuestion } from "../models/Question";

export async function getQuestions() {
  return await db.selectFrom("questions").selectAll().execute();
}

export async function createQuestion(question: NewQuestion) {
  return await db
    .insertInto("questions")
    .values(question)
    .returningAll()
    .executeTakeFirstOrThrow();
}
