import { IJwtAgent, IJwtPayload, JwtExpiredInType } from './jwt-types'
import { honoJwtAgent } from './hono-jwt-extensions'
import { joseJwtAgent } from './jose-jwt-extensions'



export class JwtAgent implements IJwtAgent {
	private readonly agent: IJwtAgent
	
	constructor(type: 'hono' | 'jose') {
		this.agent = type === 'hono' ? honoJwtAgent : joseJwtAgent;
	}

	async signAsync(payload: any, expiredIn: JwtExpiredInType, signatureKey: string): Promise<string | null> {
		return await this.agent.signAsync(payload, expiredIn, signatureKey)
	}

	async verifyAsync(token: string, signatureKey: string): Promise<IJwtPayload | null> {
		return await this.agent.verifyAsync(token, signatureKey)
	}
}