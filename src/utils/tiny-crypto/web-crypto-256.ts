



export class WebCryptoSHA256 {
	static async hashAsync(data: string) {
		const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));

		return Buffer.from(hash).toString('hex');
	}
}