import { z } from 'zod';
import { Environment } from './bindings';
import { TOutcome } from '@/utils/outcome';


const envSchema = z.object({
	ENV: z.union([z.literal('local'),z.literal('development'), z.literal('production'), z.literal('test')]),
	NGINX_PROXY_URL: z.string(),
	NGINX_PROXY_PORT: z.number(),
	LOCAL_PORT: z.number(),		

	ACCOUNT_DB_URL: z.string(),
	LOG_DB_URL: z.string(),
	
	JWT_SECRET_KEY: z.string(),
	JWT_EXPIRES_IN: z.union([z.literal('1h'), z.literal('1d'), z.literal('7d'), z.literal('30d'), z.literal('365d')]), 
	JWT_REFRESH_EXPIRES_IN: z.union([z.literal('1h'), z.literal('1d'), z.literal('7d'), z.literal('30d'), z.literal('365d')]),

	AZURE_RESOURCE_GROUP: z.string(),
	AZURE_TENANT_ID: z.string(),
	AZURE_CLIENT_ID: z.string(),
	AZURE_CLIENT_SECRET: z.string(),
	AZURE_SUBSCRIPTION_ID: z.string(),
	AZURE_INSTANCE_COMMON_KEY_PATH: z.string(),
	AZURE_INSTANCE_DEV_KEY_PATH: z.string(),

	AWS_ACCESS_KEY_ID: z.string(),
	AWS_SECRET_ACCESS_KEY: z.string(),
	AWS_REGION: z.string(),
})

export type EnvSchemaType = z.infer<typeof envSchema>;


const DatabaseType = {
	account: 'account',
	log: 'log'
} as const;
export type DatabaseType = typeof DatabaseType[keyof typeof DatabaseType];

export interface EnvConfig {
	env: 'local' | 'development' | 'production' | 'test'
	database: [DatabaseType, string]

	nginx: {
		nginxProxyUrl: string
	nginxProxyPort: number
	localPort: number
	}

	jwt: {
		jwtSecretKey: string
		jwtExpiresIn: string
		jwtRefreshExpiresIn: string
	}

	azure: {
		resourceGroup: string
		tenantId: string
		clientId: string
		clientSecret: string
		subscriptionId: string
		instanceCommonKeyPath: string
		instanceDevKeyPath: string
	}

	aws: {
		accessKeyId: string
		secretAccessKey: string
		region: string
	}
}


let config: EnvConfig;

export const getConfig = (env: Environment['Bindings']): TOutcome<EnvConfig> => {
	if (config) {
		return TOutcome.ok(config);
	}
	
	const result = envSchema.safeParse(env);
	if (!result.success) {
		return TOutcome.error('Invalid environment configuration');
	}

	const envConfig = result.data;
	
	config = {
		env: envConfig.ENV,
		database: [DatabaseType.account, envConfig.ACCOUNT_DB_URL],

		nginx: {
			nginxProxyUrl: envConfig.NGINX_PROXY_URL,
			nginxProxyPort: envConfig.NGINX_PROXY_PORT,
			localPort: envConfig.LOCAL_PORT
		},

		jwt: {
			jwtSecretKey: envConfig.JWT_SECRET_KEY,
			jwtExpiresIn: envConfig.JWT_EXPIRES_IN,
			jwtRefreshExpiresIn: envConfig.JWT_REFRESH_EXPIRES_IN
		},

		azure: {
			resourceGroup: envConfig.AZURE_RESOURCE_GROUP,
			tenantId: envConfig.AZURE_TENANT_ID,
			clientId: envConfig.AZURE_CLIENT_ID,
			clientSecret: envConfig.AZURE_CLIENT_SECRET,
			subscriptionId: envConfig.AZURE_SUBSCRIPTION_ID,
			instanceCommonKeyPath: envConfig.AZURE_INSTANCE_COMMON_KEY_PATH,
			instanceDevKeyPath: envConfig.AZURE_INSTANCE_DEV_KEY_PATH
		},

		aws: {
			accessKeyId: envConfig.AWS_ACCESS_KEY_ID,
			secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY,
			region: envConfig.AWS_REGION
		}
	}

	return TOutcome.ok(config);
}