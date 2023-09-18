import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email().min(3, 'Eposten din må være minst 3 tegn.'),
	password: z.string().min(1, 'Du må skrive inn et passord.'),
});
