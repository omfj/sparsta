import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../(auth)/logg-inn/$types';
import { getUserByEmail } from '$lib/db/models/user';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		throw error(401, '/');
	}

	const { email } = locals.user;

	const { data, error: userError } = await getUserByEmail(email);

	if (userError) {
		throw error(401, '/');
	}

	return {
		user: {
			id: data.user.id,
			email: data.user.email,
			firstName: data.user.firstName,
			lastName: data.user.lastName,
			createdAt: data.user.createdAt,
		},
	};
}) satisfies PageServerLoad;
