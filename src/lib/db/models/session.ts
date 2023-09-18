import { eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { sessions, type User } from '../schema';
import type { BaseResponse } from './utils';

type CreateSessionFunction = (userId: string, expires: Date) => BaseResponse<{ sessionId: string }>;

export const createSession: CreateSessionFunction = async (userId, expires) => {
	try {
		const session = await db
			.insert(sessions)
			.values({
				userId,
				expires,
			})
			.returning({
				id: sessions.id,
			});

		return {
			data: {
				sessionId: session[0].id,
			},
			error: null,
		};
	} catch (error) {
		return {
			data: null,
			error: {
				message: 'Could not reach database.',
			},
		};
	}
};

type GetUserBySessionIdFunction = (sessionId: string) => BaseResponse<{ user: User }>;

export const getUserBySessionId: GetUserBySessionIdFunction = async (sessionId) => {
	try {
		const session = await db.query.sessions.findFirst({
			where: (sessions, { eq }) => eq(sessions.id, sessionId),
		});

		if (!session) {
			return {
				data: null,
				error: {
					message: 'Session not found.',
				},
			};
		}

		const user = await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.id, session.userId),
		});

		if (!user) {
			return {
				data: null,
				error: {
					message: 'User not found.',
				},
			};
		}

		return {
			data: {
				user,
			},
			error: null,
		};
	} catch (error) {
		return {
			data: null,
			error: {
				message: 'Could not reach database.',
			},
		};
	}
};

type DeleteSessionFunction = (sessionId: string) => Promise<void>;

export const deleteSession: DeleteSessionFunction = async (sessionId: string) => {
	await db.delete(sessions).where(eq(sessions.id, sessionId));
};

type ValidateSessionFunction = (sessionId: string) => Promise<boolean>;

export const validateSession: ValidateSessionFunction = async (sessionId) => {
	try {
		const session = await db.query.sessions.findFirst({
			where: (sessions, { eq }) => eq(sessions.id, sessionId),
		});

		if (!session) {
			return false;
		}

		const now = new Date();

		if (session.expires < now) {
			await deleteSession(sessionId);
			return false;
		}

		return true;
	} catch (error) {
		return false;
	}
};
