import {
  mysqlTable,
  serial,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/mysql-core";

export const registration = mysqlTable("registration", {
  id: serial("id").primaryKey(),
  first_name: varchar("first_name", { length: 256 }).notNull(),
  last_name: varchar("last_name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 256 }).notNull(),
  academy: varchar("academy", { length: 256 }).notNull(),
  group: varchar("group", { length: 256 }).notNull(),
  number_months: varchar("number_months", { length: 256 }).notNull(),
  participation: varchar("participation", { length: 256 }).notNull(),
  food_allergies: varchar("food_allergies", { length: 256 }),
  food_preferences: varchar("food_preferences", { length: 256 }),
  accept_terms: boolean("accept_terms").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
