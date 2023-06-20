import { mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

export const teams = mysqlTable("teams", {
  id: serial("id").primaryKey(),
  register_id: varchar("register_id", { length: 256 }).notNull(),
  first_name: varchar("first_name", { length: 256 }).notNull(),
  last_name: varchar("last_name", { length: 256 }).notNull(),
  academy: varchar("academy", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
