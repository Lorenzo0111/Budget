import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  amount: real("amount").notNull(),
  date: integer("date", { mode: "timestamp_ms" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  category: text("category"),
});

export type Transaction = typeof transactions.$inferSelect;
