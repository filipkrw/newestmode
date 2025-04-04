import { integer, text, boolean, pgTable, index } from "drizzle-orm/pg-core";

export const TodoSchema = pgTable("todo", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull()
});

export const AccountSchema = pgTable(
  "accounts",
  {
    id: integer("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    stage: text("stage").notNull(),
    activity: integer("activity").array().notNull(),
    website: text("website").notNull(),
    location: text("location").notNull(),
    employeeRange: text("employee_range").notNull(),
    categories: text("categories").array().notNull(),
    logo: text("logo").notNull()
  },
  (table) => [index("user_idx").on(table.userId)]
);
