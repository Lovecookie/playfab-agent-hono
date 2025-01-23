import { z } from 'zod';

import { TOutcome } from '../outcome';


export interface IZodDtoBase {
	getData(): z.infer<z.SomeZodObject>;
}

export abstract class TZodDtoBase<TSchema extends z.SomeZodObject> implements IZodDtoBase {
	// 't' is a type of TSchema
	declare t: z.infer<TSchema>; 
	static readonly schema: z.SomeZodObject;

	conststructor() {
		if(!this.conststructor.hasOwnProperty('schema')) {
			throw new Error('schema not defined');
		}
	}
	
	static tryParse<T>(data: object): TOutcome<T> {
		const result = this.schema.safeParse(data);
		if(result.success) {
			return TOutcome.ok(result.data as T);
		}

		return TOutcome.error(result.error.toString());
	}

	getData(): z.infer<TSchema> {
		return this.t;
	}
}

export const responseWithSchema = z.object({
	code: z.number(),
	messages: z.array(z.string()),
	data: z.unknown(),	
})

export type ResponseWith = z.infer<typeof responseWithSchema>;