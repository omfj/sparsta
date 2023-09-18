export type BaseError = {
	message: string;
};

export type BaseResponse<T, E = BaseError> = Promise<
	| {
			data: T;
			error: null;
	  }
	| {
			data: null;
			error: E;
	  }
>;
