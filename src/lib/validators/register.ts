import { z } from 'zod';

export const registerSchema = z
	.object({
		email: z
			.string()
			.min(1, 'Du må skrive inn en e-post.')
			.email('Du må skrive inn en gyldig e-post.'),
		firstName: z.string().min(1, 'Du må skrive inn et fornavn.'),
		lastName: z.string().min(1, 'Du må skrive inn et etternavn.'),
		password: z.string().min(1, 'Du må skrive inn et passord.'),
		passwordConfirm: z.string().min(1, 'Bekreft passordet ditt.'),
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passordene må være like.',
				path: ['passwordConfirm', 'password'],
			});
		}
	});
