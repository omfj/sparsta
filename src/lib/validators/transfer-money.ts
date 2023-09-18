import { z } from 'zod';

export const transferMoneySchema = z.object({
	from: z.string().nonempty(),
	to: z.string().nonempty(),
	amount: z.number().positive().default(0),
	description: z.string().max(255),
});
