import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getBankAccountById, getBankAccountsByUserId } from '$lib/db/models/bank-account';
import { getUserByEmail } from '$lib/db/models/user';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { transferMoneySchema } from '$lib/validators/transfer-money';
import { db } from '$lib/db/drizzle';
import { bankAccounts, transactions } from '$lib/db/schema';
import { and, eq } from 'drizzle-orm';

export const load = (async ({ locals }) => {
	const { user } = locals;

	if (!user) {
		throw error(404, 'User not found');
	}

	const { email } = user;

	const { data, error: userError } = await getUserByEmail(email);

	if (userError) {
		throw error(404, 'User not found');
	}

	const accounts = await getBankAccountsByUserId(data.user.id);

	const transferMoneyForm = await superValidate(transferMoneySchema);

	return {
		user: {
			id: data.user.id,
			email: data.user.email,
			firstName: data.user.firstName,
			lastName: data.user.lastName,
			createdAt: data.user.createdAt,
		},
		accounts,
		transferMoneyForm,
	};
}) satisfies PageServerLoad;

export const actions = {
	transfer: async ({ locals, request }) => {
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

		const form = await superValidate(request, transferMoneySchema);

		if (!form.valid) {
			return fail(400, {
				transferMoneyForm: form,
			});
		}

		const { from, to, amount, description } = form.data;

		const fromAccount = await getBankAccountById(from);

		if (!fromAccount) {
			setError(form, 'from', 'Finner ikke konto');
			return fail(400, {
				transferMoneyForm: form,
			});
		}

		const toAccount = await getBankAccountById(to);

		if (!toAccount) {
			setError(form, 'to', 'Finner ikke konto');
			return fail(400, {
				transferMoneyForm: form,
			});
		}

		if (fromAccount.balance < amount) {
			setError(form, 'amount', 'Ikke nok penger');
			return fail(400, {
				transferMoneyForm: form,
			});
		}

		await db.transaction(async (tx) => {
			await tx.insert(transactions).values({
				amount,
				description,
				from: fromAccount.id,
				to: toAccount.id,
			});

			await tx
				.update(bankAccounts)
				.set({
					balance: fromAccount.balance - amount,
				})
				.where(and(eq(bankAccounts.id, from), eq(bankAccounts.owner, fromAccount.owner)));

			await tx
				.update(bankAccounts)
				.set({
					balance: toAccount.balance + amount,
				})
				.where(and(eq(bankAccounts.id, to), eq(bankAccounts.owner, toAccount.owner)));
		});

		return {
			message: 'Money transferred successfully',
		};
	},
} satisfies Actions;
