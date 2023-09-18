import { getBankAccountById } from '$lib/db/models/bank-account';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db/drizzle';
import { desc, eq, or } from 'drizzle-orm';

export const load = (async ({ parent, params }) => {
	const parentData = await parent();

	const { user } = parentData;

	const { id } = params;

	const bankAccount = await getBankAccountById(id);

	if (bankAccount?.owner !== user.id || !bankAccount) {
		throw error(404, 'Account not found');
	}

	const transactions = await db.query.transactions.findMany({
		where: (transactions) => or(eq(transactions.from, id), eq(transactions.to, id)),
		orderBy: (transactions) => desc(transactions.date),
	});

	return {
		user,
		transactions,
		bankAccount,
	};
}) satisfies PageServerLoad;
