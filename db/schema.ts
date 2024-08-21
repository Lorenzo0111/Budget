import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const expenses = sqliteTable("expenses", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  amount: integer("amount").notNull(),
  date: integer("date", { mode: "timestamp_ms" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  category: text("category"),
});

export type Expense = typeof expenses.$inferSelect;
