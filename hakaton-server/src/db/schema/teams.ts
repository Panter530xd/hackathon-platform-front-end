import {
  mysqlTable,
  serial,
  timestamp,
  varchar,
  json,
} from "drizzle-orm/mysql-core";

export const teams = mysqlTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  members: json("members").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
