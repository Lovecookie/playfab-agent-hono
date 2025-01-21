
export class BitShuffler {
	private static readonly GOLDEN_RATIO = 0x9E3779B9
	private static readonly SHIFT_BITS = 6

	static create() {
		return new BitShuffler()
	}

	encode(data: string): string {
		const num = this.stringToNumber(data)
		const shuffled = this.shuffle(num)

		return this.numberToString(shuffled)
	}

	decode(encoded: string): string {
		const num = parseInt(encoded, 36)
		const unshuffled = this.unshuffle(num)

		return unshuffled.toString()
	}

	private stringToNumber(str: string): number {
		let hash = 5381
		for(let i = 0; i < str.length; i++) {
			hash = ((hash << BitShuffler.SHIFT_BITS) + hash) + str.charCodeAt(i)			
		}

		return hash >>> 0
	}

	private numberToString(num: number): string {
		return num.toString(36)
	}

	private shuffle(num: number): number {
		num = ((num >> 16) | (num << 16)) >>> 0
		num = ((num & 0x00FF00FF) >> 8) | ((num & 0xFF00FF00) << 8)
		num ^= BitShuffler.GOLDEN_RATIO

		return num >>> 0
	}

	private unshuffle(num: number): number {
		num ^= BitShuffler.GOLDEN_RATIO
		num = ((num & 0x00FF00FF) >> 8) | ((num & 0xFF00FF00) << 8)
		num = ((num >> 16) | (num << 16)) >>> 0

		return num >>> 0
	}
}