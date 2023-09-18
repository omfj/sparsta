import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getUserByEmail } from '$lib/db/models/user';
import { getBankAccountsByUserId } from '$lib/db/models/bank-account';
import { superValidate } from 'sveltekit-superforms/server';
import { addMoneySchema } from '$lib/validators/add-money';
import { db } from '$lib/db/drizzle';
import { bankAccounts } from '$lib/db/schema';
import { and, eq, sql } from 'drizzle-orm';

export const load = (async ({ parent }) => {
	const parentData = await parent();

	const { user } = parentData;

	const accounts = await getBankAccountsByUserId(user.id);

	const addMoneyForm = await superValidate(addMoneySchema);

	return {
		accounts,
		addMoneyForm,
	};
}) satisfies PageServerLoad;

export const actions = {
	addMoney: async ({ locals, request }) => {
		const { user } = locals;

		if (!user) {
			return fail(400, {
				message: 'User not found',
			});
		}

		const { email } = user;

		const { error: userError } = await getUserByEmail(email);

		if (userError) {
			return fail(400, {
				message: 'User not found',
			});
		}

		const form = await superValidate(request, addMoneySchema);

		if (!form.valid) {
			return fail(400, {
				addMoneyForm: form,
			});
		}

		const { bankAccountId, amount } = form.data;

		await db
			.update(bankAccounts)
			.set({
				balance: sql`${bankAccounts.balance} + ${amount}`,
			})
			.where(and(eq(bankAccounts.id, bankAccountId), eq(bankAccounts.owner, user.id)));

		return {
			addMoneyForm: form,
		};
	},
} satisfies Actions;
