import { eq } from 'drizzle-orm';
import { hash } from '../../utils/hash';
import { db } from '../drizzle';
import { users, type User } from '../schema';
import type { BaseResponse } from './utils';

type CreateUserFunction = (
	email: string,
	firstName: string,
	lastName: string,
	password: string,
) => BaseResponse<{ userId: string }>;

export const createUser: CreateUserFunction = async (email, firstName, lastName, password) => {
	try {
		const existingUser = await db.query.users.findFirst({
			where: (users) => eq(users.email, email),
		});

		if (existingUser) {
			return {
				data: null,
				error: {
					message: 'User with username or email already exists.',
				},
			};
		}

		const hashedPassword = hash(password);

		const user = await db
			.insert(users)
			.values({
				email,
				firstName,
				lastName,
				password: hashedPassword,
			})
			.returning();

		return {
			data: {
				userId: user[0].id,
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

type ValidateUserFunction = (email: string, password: string) => BaseResponse<{ user: User }>;

export const validateUser: ValidateUserFunction = async (email, password) => {
	try {
		const user = await db.query.users.findFirst({
			where: (users) => eq(users.email, email),
		});

		if (!user) {
			return {
				data: null,
				error: {
					message: 'User not found.',
				},
			};
		}

		const hashedPassword = hash(password);

		if (user.password !== hashedPassword) {
			return {
				data: null,
				error: {
					message: 'Invalid password.',
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

type GetUserByEmailFunction = (email: string) => BaseResponse<{ user: User }>;

export const getUserByEmail: GetUserByEmailFunction = async (email) => {
	try {
		const user = await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.email, email),
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
