import { relations } from 'drizzle-orm';
import { doublePrecision, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { bankAccounts } from './bank-accounts';

export const transactions = pgTable('transaction', {
	id: uuid('id').notNull().primaryKey().defaultRandom(),
	from: uuid('from').notNull(),
	to: uuid('to').notNull(),
	amount: doublePrecision('amount').notNull(),
	description: text('description'),
	date: timestamp('date', { mode: 'date' }).notNull().defaultNow(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
	from: one(bankAccounts, {
		fields: [transactions.from],
		references: [bankAccounts.id],
		relationName: 'from',
	}),
	to: one(bankAccounts, {
		fields: [transactions.to],
		references: [bankAccounts.id],
		relationName: 'to',
	}),
}));
