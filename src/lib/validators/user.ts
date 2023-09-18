import { z } from 'zod';

export const sessionUserSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	firstName: z.string(),
	lastName: z.string(),
});

export type SessionUser = z.infer<typeof sessionUserSchema>;
