import { z } from 'zod';

export const addMoneySchema = z.object({
	bankAccountId: z.string().min(1).max(255),
	amount: z.number().min(1),
});
