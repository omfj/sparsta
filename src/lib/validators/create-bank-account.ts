import { z } from 'zod';

export const createBankAccountSchema = z.object({
	name: z.string().min(1).max(255),
	description: z.string().max(255),
	type: z.enum(['checking', 'savings']),
});
