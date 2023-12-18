import { Selectable, Insertable, Updateable } from "kysely";

export interface GroupTable {
  groupId: string;
}

export type Group = Selectable<GroupTable>;
export type NewGroup = Insertable<GroupTable>;
export type UpdateGroup = Updateable<GroupTable>;
