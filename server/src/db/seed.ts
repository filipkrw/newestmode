const USER_ID = "user_2v5ghHe9k9I45W7t0MDWT2DbMtB";

import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { accounts } from "./data";
import { AccountSchema } from "./schema";

dotenv.config({ path: "./.env.local" });

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(client);
  const data = []; // Omit<typeof AccountSchema.$inferInsert, "id">[] = [];

  let id = 0;

  for (const account of accounts) {
    data.push({
      id,
      userId: USER_ID,
      name: account.name,
      stage: account.stage,
      activity: account.activity,
      website: account.website,
      location: account.location,
      employeeRange: account.employeeRange,
      categories: account.categories,
      logo: account.logo,
    });
    id++;
  }

  console.log("Seed start");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await db.insert(AccountSchema).values(data);
  console.log("Seed done");
};

main();
