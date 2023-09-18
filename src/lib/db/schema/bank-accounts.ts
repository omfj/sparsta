import { relations, type InferSelectModel } from 'drizzle-orm';
import { doublePrecision, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { bankAccountTypeEnum } from './enums';
import { transactions } from './transactions';
import { users } from './user';

export type BankAccount = InferSelectModel<typeof bankAccounts>;

export const bankAccounts = pgTable('bankAccount', {
	id: uuid('id').notNull().primaryKey().defaultRandom(),
	owner: uuid('owner').notNull(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	balance: doublePrecision('balance').notNull(),
	type: bankAccountTypeEnum('type').notNull(),
});

export const bankAccountsRelations = relations(bankAccounts, ({ one, many }) => ({
	transactionsFrom: many(transactions, {
		relationName: 'from',
	}),
	transactionsTo: many(transactions, {
		relationName: 'to',
	}),
	owner: one(users, {
		fields: [bankAccounts.owner],
		references: [users.id],
	}),
}));
