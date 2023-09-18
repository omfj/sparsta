import { type InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, text, uuid, varchar, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { sessions } from './session';
import { bankAccounts } from './bank-accounts';

export type User = InferSelectModel<typeof users>;

export const users = pgTable(
	'users',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		email: varchar('email', { length: 255 }).notNull(),
		firstName: varchar('first_name', { length: 255 }).notNull(),
		lastName: varchar('last_name', { length: 255 }).notNull(),
		password: text('password').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull(),
	},
	(users) => ({
		emailIndex: uniqueIndex('email_idx').on(users.email),
	}),
);

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	bankAccounts: many(bankAccounts),
}));
