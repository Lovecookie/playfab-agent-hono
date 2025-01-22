// import * as jose from 'jose'
import type { JwtVariables } from 'hono/jwt'


export type Environment = {
	Bindings: {
		ENV: string

		NGINX_PROXY_URL: string
		NGINX_PROXY_PORT: number
		LOCAL_PORT: number
		
		JWT_SECRET_KEY: string
		JWT_EXPIRES_IN: string
		JWT_REFRESH_EXPIRES_IN: string

		ACCOUNT_DB_URL: string
		LOG_DB_URL: string		

		AZURE_RESOURCE_GROUP: string
		AZURE_TENANT_ID: string
		AZURE_CLIENT_ID: string
		AZURE_CLIENT_SECRET: string
		AZURE_SUBSCRIPTION_ID: string
		AZURE_INSTANCE_COMMON_KEY_PATH: string
		AZURE_INSTANCE_DEV_KEY_PATH: string

		AWS_ACCESS_KEY_ID: string
		AWS_SECRET_ACCESS_KEY: string
		AWS_REGION: string
	},
	Variables: JwtVariables
}