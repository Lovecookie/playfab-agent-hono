

////////////////////////////////////////////////////////////////////////////////////////////////
// Shared constants
export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
export const ENTRA_TOKEN = 'entra_token';

export const ADMIN_NICKNAME_MIN = 4;
export const ADMIN_NICKNAME_MAX = 20;

export const ADMIN_PASSWORD_MIN = 8;
export const ADMIN_PASSWORD_MAX = 32;


////////////////////////////////////////////////////////////////////////////////////////////////
// Shared functions
export function isClient() {
	return typeof window !== 'undefined';
}

export function isServer() {
	return !isClient();
}

