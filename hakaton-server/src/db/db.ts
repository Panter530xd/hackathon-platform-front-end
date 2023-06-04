import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

const createDbConnection = () => {
  // create the connection
  const connection = connect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  });

  return drizzle(connection);
};

export default createDbConnection;
