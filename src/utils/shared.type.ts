
export interface JWTTokens {
	accessToken: string;
	refreshToken: string;
}

export interface EntraTokens {
	accessToken: string;	
}

export type RedirectCallback = () => void;