import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
	out: './drizzle/migrations',
	schema: './src/lib/db/schema',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL as string,
	},
} satisfies Config;
