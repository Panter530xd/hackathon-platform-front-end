import { mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

export const agenda = mysqlTable("agenda", {
  id: serial("id").primaryKey(),
  eventDurationFrom: varchar("eventDurationFrom", { length: 256 }).notNull(),
  eventDurationTo: varchar("eventDurationTo", { length: 256 }).notNull(),
  eventOpeningFrom: varchar("eventOpeningFrom", { length: 256 }).notNull(),
  eventOpeningTo: varchar("eventOpeningTo", { length: 256 }).notNull(),
  findYourSpotFrom: varchar("findYourSpotFrom", { length: 256 }).notNull(),
  findYourSpotTo: varchar("findYourSpotTo", { length: 256 }).notNull(),
  firstRoundSessionsFrom: varchar("firstRoundSessionsFrom", { length: 256 }).notNull(),
  firstRoundSessionsTo: varchar("firstRoundSessionsTo", { length: 256 }).notNull(),
  secondRoundSessionsFrom: varchar("secondRoundSessionsFrom", { length: 256 }).notNull(),
  secondRoundSessionsTo: varchar("secondRoundSessionsTo", { length: 256 }).notNull(),
  registrationFrom: varchar("registrationFrom", { length: 256 }).notNull(),
  registrationTo: varchar("registrationTo", { length: 256 }).notNull(),
  presentationsFrom: varchar("presentationsFrom", { length: 256 }).notNull(),
  presentationsTo: varchar("presentationsTo", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
