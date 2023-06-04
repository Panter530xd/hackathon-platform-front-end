// import {
//   drizzle,
//   PlanetScaleDatabase,
// } from "drizzle-orm/planetscale-serverless";
// import { connect } from "@planetscale/database";

// async function runMigrations() {
//   // Create the connection
//   const connection = connect({
//     host: process.env.DATABASE_HOST,
//     username: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//   });

//   // Create the Drizzle database instance
//   const dbMigrate: PlanetScaleDatabase<Record<string, never>> =
//     drizzle(connection);

//   // Perform your own migration logic here using the PlanetScale client or another migration tool

//   console.log("Migrations applied successfully.");
// }

// runMigrations().catch((error) => {
//   console.error("Error applying migrations:", error);
// });
