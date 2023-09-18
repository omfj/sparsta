import { asc, eq, sql } from 'drizzle-orm';

import { db } from '../drizzle';
import { bankAccounts, type BankAccount } from '../schema';

export const selectBankAccountsByUserId = db.query.bankAccounts
	.findMany({
		where: (account) => eq(account.owner, sql.placeholder('userId')),
		orderBy: (account) => asc(account.name),
	})
	.prepare('select-bank-account-by-user-id');

export async function getBankAccountsByUserId(
	userId: BankAccount['owner'],
): Promise<Array<BankAccount>> {
	return await selectBankAccountsByUserId.execute({ userId });
}

export const selectBankAccountById = db.query.bankAccounts
	.findFirst({
		where: (account) => eq(account.id, sql.placeholder('id')),
	})
	.prepare('select-bank-account-by-id');

export async function getBankAccountById(id: string): Promise<BankAccount | null> {
	return (await selectBankAccountById.execute({ id })) ?? null;
}

const IS_BONUS = true;

export async function createBankAccount(
	userId: BankAccount['owner'],
	name: BankAccount['name'],
	description: BankAccount['description'],
	type: BankAccount['type'],
) {
	return await db
		.insert(bankAccounts)
		.values({
			owner: userId,
			name,
			description,
			balance: IS_BONUS ? 1000 : 0,
			type,
		})
		.returning();
}
