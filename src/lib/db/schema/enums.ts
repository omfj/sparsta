import { pgEnum } from 'drizzle-orm/pg-core';

export const bankAccountTypeEnum = pgEnum('bank_account_type', ['checking', 'savings']);

export type BankAccountType = (typeof bankAccountTypeEnum.enumValues)[number];
