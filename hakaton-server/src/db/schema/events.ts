import { mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

export const events = mysqlTable("events", {
  id: serial("id").primaryKey(),
  name_of_event: varchar("name_of_event", { length: 256 }).notNull(),
  location: varchar("location", { length: 256 }).notNull(),
  type_of_event: varchar("type_of_event", { length: 256 }).notNull(),
  submission_deadline: varchar("submission_deadline", {
    length: 256,
  }).notNull(),
  start_date: varchar("start_date", { length: 256 }).notNull(),
  end_date: varchar("end_date", { length: 256 }).notNull(),
  academies_part: varchar("academies_part", { length: 256 }).notNull(),
  event_info: varchar("event_info", { length: 256 }).notNull(),
  client_info: varchar("client_info", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
