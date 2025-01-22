import{ jwt } from 'hono/jwt'
import { MiddlewareHandler } from 'hono'
import httpStatus from 'http-status'


import { ApiError } from '@/utils/api-error'	
import { Environment } from '@/types/bindings'

export const guardMiddleware = (): MiddlewareHandler<Environment> =>
	async (ctx, next) => {
		const credentials = ctx.req.raw.headers.get('Authorization')
		
		if(!credentials) {
			throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized request')
		}

		const parts = credentials.split(' ')

		await next();
	}