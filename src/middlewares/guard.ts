import { MiddlewareHandler } from 'hono'
import httpStatus from 'http-status'

import { JwtAgent } from '@/utils/jwt-agent'
import { ApiError } from '@/utils/api-error'	
import { Environment } from '@/config/bindings'
import { getConfig } from '@/config/env-config'


const jwtAgent = new JwtAgent('jose');

export const guardMiddleware = (): MiddlewareHandler<Environment> =>
	async (ctx, next) => {
		const credentials = ctx.req.raw.headers.get('Authorization')
		const configOutcome = getConfig(ctx.env)
		if(!configOutcome.success) {
			throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, configOutcome.message)
		}
		
		if(!credentials) {
			throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized request')
		}

		const parts = credentials.split(' ')
		if(parts.length !== 2) {
			throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized request')
		}

		const [scheme, token] = parts
		if(scheme !== 'Bearer') {
			throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized request')
		}

		const config = configOutcome.value
		const payload = await jwtAgent.verifyAsync(token, config.jwt.jwtSecretKey)
		if(payload == null) {
			throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized request')
		}

		ctx.set('payload', payload)

		await next();
	}