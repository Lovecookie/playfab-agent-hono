// import * as jose from 'jose'
import type { JwtVariables } from 'hono/jwt'


export type Environment = {
	Bindings: {
		ENV: string
		JWT_SECRET: string
		JWT_ACCESS_EXPIRATION_MINUTES: number
		JWT_REFRESH_EXPIRATION_DAYS: number
		JWT_RESET_PASSWORD_EXPIRATION_MINUTES: number
		JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: number
		DATABASE_NAME: string
		DATABASE_USERNAME: string
		DATABASE_PASSWORD: string
		DATABASE_HOST: string
		AWS_ACCESS_KEY_ID: string
		AWS_SECRET_ACCESS_KEY: string
		AWS_REGION: string
		EMAIL_SENDER: string
	},
	Variables: JwtVariables
}