

export const JwtTokenType = {
	Access: 'access',
	Refresh: 'refresh',
	Entra: 'entra',
	ResetPassword: 'resetPassword'
} as const
export type JwtTokenType = typeof JwtTokenType[keyof typeof JwtTokenType]

export const JwtExpiredInType = {
	OneHour: '1h',
	OneDay: '1d',
	OnWeek: '7d',
	OnMonth: '30d',
	OnYear: '365d'
} as const
export type JwtExpiredInType = typeof JwtExpiredInType[keyof typeof JwtExpiredInType]

export interface IJwtPayload {
	idx: string
	usr: string
	tkn: string

	iss?: string
	sub?: string
	aud?: string | string[];
	jti?: string
	nbf?: number
	exp?: number
	iat?: number
}

export interface IJwtAgent {
	signAsync(payload: IJwtPayload, expiredIn: JwtExpiredInType, signatureKey: string): Promise<string | null>
	verifyAsync(token: string, signatureKey: string): Promise<IJwtPayload | null>	
}


export const JWT_HEADER = {
	alg: 'HS256',
	typ: 'jwt'
}