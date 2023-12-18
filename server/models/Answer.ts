import { Generated, Selectable, Insertable, Updateable } from "kysely";

export interface AnswersTable {
  answerId: Generated<Number>;
  answer: string | null;
  isCorrect: boolean | null;
}

export type Answer = Selectable<AnswersTable>;
export type NewAnswer = Insertable<AnswersTable>;
export type UpdateAnswer = Updateable<AnswersTable>;
