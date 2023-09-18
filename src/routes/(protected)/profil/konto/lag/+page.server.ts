import { createBankAccount } from '$lib/db/models/bank-account';
import { getUserByEmail } from '$lib/db/models/user';
import { createBankAccountSchema } from '$lib/validators/create-bank-account';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions } from './$types';

export const actions = {
	default: async ({ locals, request }) => {
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

		const form = await superValidate(request, createBankAccountSchema);
		if (!form.valid) {
			return fail(400, {
				createBankAccountForm: form,
			});
		}

		const { name, description, type } = form.data;

		await createBankAccount(user.id, name, description, type);

		return {
			createBankAccountForm: form,
		};
	},
} satisfies Actions;
