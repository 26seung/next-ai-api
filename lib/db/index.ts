// Drizzle 문서 : https://orm.drizzle.team/docs/quick-postgresql/neon

import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.NEON_DATABASE_URL!);

export const db = drizzle(sql);
