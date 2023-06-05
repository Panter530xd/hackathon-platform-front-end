import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import createDbConnection from "../db";
import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
let db = createDbConnection();
export const academies = mysqlTable("academies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});
export const groups = mysqlTable("groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  academyId: varchar("academy_id", { length: 256 }).notNull(),
});

const academyData = [
  { id: 1, name: "UX/UI Дизајн" },
  { id: 2, name: "Дигитален Маркетинг" },
  { id: 3, name: "Графички Дизајн" },
  { id: 4, name: "Project and Product Management" },
  { id: 5, name: "Data Science" },
  { id: 6, name: "Човечки Ресурси" },
  { id: 7, name: "Full-Stack програмирање" },
  { id: 8, name: "Front-end програмирање" },
  { id: 9, name: "Software testing" },
  { id: 10, name: "Leadership and Management" },
];

const groupData = [
  // Groups for UX/UI Дизајн (Academy ID: 1)
  { name: "Group 1", academyId: "1" },
  { name: "Group 2", academyId: "1" },
  { name: "Group 3", academyId: "1" },

  // Groups for Дигитален Маркетинг (Academy ID: 2)
  { name: "Group 4", academyId: "2" },
  { name: "Group 5", academyId: "2" },
  { name: "Group 6", academyId: "2" },

  // Groups for Графички Дизајн (Academy ID: 3)
  { name: "Group 7", academyId: "3" },
  { name: "Group 8", academyId: "3" },
  { name: "Group 9", academyId: "3" },

  // Groups for Project and Product Management (Academy ID: 4)
  { name: "Group 10", academyId: "4" },
  { name: "Group 11", academyId: "4" },
  { name: "Group 12", academyId: "4" },

  // Groups for Data Science (Academy ID: 5)
  { name: "Group 13", academyId: "5" },
  { name: "Group 14", academyId: "5" },
  { name: "Group 15", academyId: "5" },

  // Groups for Човечки Ресурси (Academy ID: 6)
  { name: "Group 16", academyId: "6" },
  { name: "Group 17", academyId: "6" },
  { name: "Group 18", academyId: "6" },

  // Groups for Full-Stack програмирање (Academy ID: 7)
  { name: "Group 19", academyId: "7" },
  { name: "Group 20", academyId: "7" },
  { name: "Group 21", academyId: "7" },

  // Groups for Front-end програмирање (Academy ID: 8)
  { name: "Group 22", academyId: "8" },
  { name: "Group 23", academyId: "8" },
  { name: "Group 24", academyId: "8" },

  // Groups for Software testing (Academy ID: 9)
  { name: "Group 25", academyId: "9" },
  { name: "Group 26", academyId: "9" },
  { name: "Group 27", academyId: "9" },

  // Groups for Leadership and Management (Academy ID: 10)
  { name: "Group 28", academyId: "10" },
  { name: "Group 29", academyId: "10" },
  { name: "Group 30", academyId: "10" },
];

const seedGroups = async (db: PlanetScaleDatabase<Record<string, never>>) => {
  const existingGroups = await db.select().from(groups).execute();
  const existingGroupNames = existingGroups.map(
    (group: { name: string }) => group.name
  );

  const newGroups = groupData.filter(
    (group) => !existingGroupNames.includes(group.name)
  );

  await db.insert(groups).values(newGroups).execute();
};

const seedAcademies = async (
  db: PlanetScaleDatabase<Record<string, never>>
) => {
  await db.insert(academies).values(academyData).execute();
};

seedAcademies(db)
  .then(() => {
    console.log("Academies seeded successfully.");
    seedGroups(db)
      .then(() => {
        console.log("Groups seeded successfully.");
      })
      .catch((error) => {
        console.error("Error seeding groups:", error);
      });
  })
  .catch((error) => {
    console.error("Error seeding academies:", error);
  });
