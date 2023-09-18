import type { LayoutServerLoad } from './$types';
import { getBankAccountsByUserId } from '$lib/db/models/bank-account';
import { superValidate } from 'sveltekit-superforms/server';
import { createBankAccountSchema } from '$lib/validators/create-bank-account';

export const load = (async ({ parent }) => {
	const parentData = await parent();

	const { user } = parentData;

	const accounts = await getBankAccountsByUserId(user.id);

	const createBankAccountForm = await superValidate(createBankAccountSchema);

	return {
		accounts,
		createBankAccountForm,
	};
}) satisfies LayoutServerLoad;
