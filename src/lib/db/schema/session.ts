import { type InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user';

/**
 * Sessions
 */
export const sessions = pgTable('sessions', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id),
	expires: timestamp('expires').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});
export type Session = InferSelectModel<typeof sessions>;

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}));
