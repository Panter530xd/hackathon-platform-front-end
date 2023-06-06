import { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

const config: Config = {
  schema: "./src/db/schema",
  out: "./drizzle/migrations",
  connectionString: process.env.DATABASE_URL,
};

export { config };
