

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const SHIFT = 7

export class StringShuffler {
	static create() {
		return new StringShuffler()
	}

	encode(data: string): string {
		return Array.from(data)
			.map(char => {
				const index = CHARS.indexOf(char)
				if(index === -1) {
					return char
				}

				const newIndex = (index + SHIFT) % CHARS.length
				return CHARS[newIndex]
			})
			.reverse()
			.join('')
	}

	decode(encoded: string): string {
		return Array.from(encoded)
			.reverse()
			.map(char => {
				const index = CHARS.indexOf(char)
				if(index === -1) {
					return char
				}

				const newIndex = (index - SHIFT + CHARS.length) % CHARS.length
				return CHARS[newIndex]				
			})
			.join('')
	}
}