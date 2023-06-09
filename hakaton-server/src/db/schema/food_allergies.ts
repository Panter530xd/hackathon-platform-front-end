import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { createDbConnection } from "../db";

export const foodAllergies = mysqlTable("food_allergies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});

const foodAllergiesData = [
  { name: "Gluten" },
  { name: "Nuts" },
  { name: "Milk" },
  { name: "Eggs" },
  { name: "Soy" },
  { name: "Fish" },
  { name: "None" },
];

const seedFoodAllergies = async (
  db: PlanetScaleDatabase<Record<string, never>>
) => {
  const existingFoodAllergies = await db.select().from(foodAllergies).execute();
  const existingFoodAllergyNames = existingFoodAllergies.map(
    (foodAllergy: { name: string }) => foodAllergy.name
  );

  const newFoodAllergies = foodAllergiesData.filter(
    (foodAllergy) => !existingFoodAllergyNames.includes(foodAllergy.name)
  );

  await db.insert(foodAllergies).values(newFoodAllergies).execute();
  console.log("Food Allergies seeded successfully.");
};

const seedData = async () => {
  try {
    const db = createDbConnection(); // Create the database connection

    await seedFoodAllergies(db);
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seedData();
