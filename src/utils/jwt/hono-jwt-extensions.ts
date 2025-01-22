import { verify, sign } from 'hono/jwt'
import { JWTPayload } from 'hono/utils/jwt/types'
import { SignatureKey } from 'hono/utils/jwt/jws'
import { SignatureAlgorithm } from 'hono/utils/jwt/jwa'
import { IJwtAgent } from '@/utils/jwt/jwt-types'



import { JWT_HEADER, IJwtPayload, JwtExpiredInType } from './jwt-types';



export const honoJwtAgent: IJwtAgent = {	
	signAsync: async (payload: IJwtPayload, expiredIn: JwtExpiredInType, signatureKey: string): Promise<string | null> => {
		try {
			const alg = JWT_HEADER.alg as SignatureAlgorithm;

			let exp = 0;
			switch(expiredIn) {
				case JwtExpiredInType.OneHour:
					exp = Date.now() + 3600;
					break;
				case JwtExpiredInType.OneDay:
					exp = Date.now() + 86400;
					break;
				case JwtExpiredInType.OnWeek:
					exp = Date.now() + 604800;
					break;
				case JwtExpiredInType.OnMonth:
					exp = Date.now() + 2592000;
					break;
				case JwtExpiredInType.OnYear:
					exp = Date.now() + 31536000;
					break;
			}

			let convertedPayload: JWTPayload = {
				...payload,
				exp: exp,
			}
			convertedPayload['idx'] = payload.idx;
			convertedPayload['usrType'] = payload.usrType;

			const token = await sign(convertedPayload, signatureKey, alg);

			return token;
		} catch(error) {
			console.error(error);

			return null;
		}
	},

	verifyAsync: async (token: string, signatureKey: string): Promise<IJwtPayload | null> => {
		try {
			const alg = JWT_HEADER.alg as SignatureAlgorithm;
			const payload = await verify(token, signatureKey, alg);			
			const convertedPayload: IJwtPayload = {
				idx: payload['idx'] as string,
				usrType: payload['usrType'] as string,
				...payload,				
			}

			return convertedPayload;
		} catch (error) {
			console.error(error);

			return null;
		}
	}
}


