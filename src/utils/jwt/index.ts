import { IJwtAgent, JwtExpiredInType } from './jwt-types'
import { honoJwtAgent } from './hono-jwt-extensions'
import { joseJwtAgent } from './jose-jwt-extensions'



export class JwtAgent implements IJwtAgent {
	private readonly agent: IJwtAgent
	
	constructor(type: 'hono' | 'jose') {
		this.agent = type === 'hono' ? honoJwtAgent : joseJwtAgent;
	}

	signAsync(payload: any, expiredIn: JwtExpiredInType, signatureKey: string): Promise<string | null> {
		return this.agent.signAsync(payload, expiredIn, signatureKey)
	}

	verifyAsync(token: string, signatureKey: string): Promise<any | null> {
		return this.agent.verifyAsync(token, signatureKey)
	}
}