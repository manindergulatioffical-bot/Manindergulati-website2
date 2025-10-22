import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// Database connection
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

// Export all tables from schema
export * from "./schema";