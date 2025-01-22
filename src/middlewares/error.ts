import { ErrorHandler } from "hono";
import { StatusCode, ContentfulStatusCode } from 'hono/utils/http-status';
import { object, ZodError } from "zod";
import { fromError } from 'zod-validation-error'
import httpStatus from 'http-status';

import { Environment } from "@/types/bindings";
import { ApiError } from "@/utils/api-error";


const genericJSONMsg = 'Unexpected end of JSON input';

export const errorConverter = (err: unknown): ApiError => {
	let error = err;
	if(error instanceof ZodError) {
		const errorMsg = fromError(error).message;
		error = new ApiError(httpStatus.BAD_REQUEST, errorMsg);
	} else if(error instanceof SyntaxError && error.message.includes(genericJSONMsg)) {
		error = new ApiError(httpStatus.BAD_REQUEST, 'Invalid JSON');
	} else if(!(error instanceof ApiError)) {
		const castedErr = (typeof error === 'object' ? error : {}) as Record<string, unknown>;
		const statusCode: StatusCode = typeof castedErr.statusCode === 'number' ?  (castedErr.statusCode as StatusCode) : httpStatus.INTERNAL_SERVER_ERROR;
		const message = (castedErr.description || castedErr.message || httpStatus[statusCode.toString() as keyof typeof httpStatus]) as string;

		error = new ApiError(statusCode, message, false);
	}

	return error as ApiError;
}

export const errorHandler: ErrorHandler<Environment> = async (err, ctx) => {
	const env = ctx.env.ENV || 'production';

	const error = errorConverter(err);
	if(env === 'production' && !error.isOperational) {		
		error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
		error.message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR].toString();
	}	

	const response = {
		code: error.statusCode,
		message: error.message,
		... (env === 'development' && { stack: err.stack })
	}

	return ctx.json(response, error.statusCode as ContentfulStatusCode);
}