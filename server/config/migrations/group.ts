import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("group")
    .addColumn("groupId", "varchar(500)", (col) => col.primaryKey())
    .execute();
}
