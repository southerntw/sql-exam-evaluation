import { Generated, Selectable, Insertable, Updateable } from "kysely";

export interface QuestionTable {
  questionId: Generated<number>;
  text: string;
  difficulty: string;
  correctAnswer: string;
  jsonAnswer: string | null;
}

export type Question = Selectable<QuestionTable>;
export type NewQuestion = Insertable<QuestionTable>;
export type UpdateGroup = Updateable<QuestionTable>;
