import * as jose from 'jose';
import { JWTHeaderParameters } from 'jose/dist/types';


import { IJwtAgent, IJwtPayload, JWT_HEADER, JwtExpiredInType } from './jwt-types';


export const joseJwtAgent: IJwtAgent = {
	signAsync: async (payload: IJwtPayload, expiredIn: JwtExpiredInType, signatureKey: string): Promise<string | null> => {
		const header: JWTHeaderParameters = {
			...JWT_HEADER,
		}
	
		const convertedPayload: jose.JWTPayload = {
			...payload,			
		}		
		convertedPayload['idx'] = payload.idx
		convertedPayload['usr'] = payload.usr
		convertedPayload['tkn'] = payload.tkn
	
		try {
			const secretKey = new TextEncoder().encode(signatureKey ?? "")
			const jwt = await new jose.SignJWT(convertedPayload)
				.setProtectedHeader(header)	
				.setExpirationTime(expiredIn)
				.sign(secretKey)
	
			return jwt
		} catch {
			return null
		}
	},

	verifyAsync: async (token: string, signatureKey: string): Promise<IJwtPayload | null> => {
		try {
			const secretKey = new TextEncoder().encode(signatureKey ?? "")
			const { payload } = await jose.jwtVerify(token, secretKey)

			const convertedPayload: IJwtPayload = {				
				...payload,
				idx: payload['idx'] as string,
				usr: payload['usrType'] as string,
				tkn: payload['tkn'] as string,
			}
	
			return convertedPayload
		} catch(error) {
			console.log(`Invalid token: ${error}`)
			return null
		}
	}
}


