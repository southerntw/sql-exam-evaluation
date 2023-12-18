import { Generated, Selectable, Insertable, Updateable } from "kysely";

export interface UserTable {
  userId: Generated<number>;
  name: string;
  email: string;
  password: string;
  role: string;
  score: number | null;
  refresh_token: string | null;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;
