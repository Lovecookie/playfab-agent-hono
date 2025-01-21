import { z } from 'zod';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// reference: https://github.com/JacobWeisenburger/zod_utilz
// discussions: https://github.com/colinhacks/zod/discussions/2215
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



// constants values //////////////////////////////////////////////////////////////////////////////////////////
export const ZMIN_INT8 = -(1 << 7);
export const ZMAX_INT8 = (1 << 7) - 1;
export const UNSIGNED_INT8_MAX = (1 << 8) - 1;

export const ZMIN_INT16 = -(1 << 15);
export const ZMAX_INT16 = (1 << 15) - 1;
export const UNSIGNED_INT16_MAX = (1 << 16) - 1;

export const zint8 = z.number().int().min(ZMIN_INT8).max(ZMAX_INT8);
export const zuint8 = z.number().int().min(0).max(UNSIGNED_INT8_MAX);

export const zint16 = z.number().int().min(ZMIN_INT16).max(ZMAX_INT16);
export const zuint16 = z.number().int().min(0).max(UNSIGNED_INT16_MAX);
export const jsonType = () => jsonSchema;

export const zdouble = z.number().refine(val => Number.isFinite(val), {
    message: 'Value sholud be a number'
});

export const zjson = z.string().transform( (str, ctx): z.infer<ReturnType<typeof jsonType>> => {    
    try {
        return JSON.parse(str);
    } catch(e) {
        ctx.addIssue({
            code: 'custom',
            message: `Invalid JSON string ${e}`
        })
        return z.NEVER  
    }    
})

// functions //////////////////////////////////////////////////////////////////////////////////////////
export function toBigInt(): z.ZodUnion<[z.ZodEffects<z.ZodString, bigint>, z.ZodBigInt]> {
    return z.union([
        z.string().transform(val => BigInt(val)),
        z.bigint()
    ])
}



// schema //////////////////////////////////////////////////////////////////////////////////////////
const literalSchema = z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null()
])

type Literal = z.infer<typeof literalSchema>

type Json = Literal | { [key: string]: Json } | Json[]

const  jsonSchema: z.ZodType<Json> = z.lazy( () =>
    z.union([literalSchema, z.record(jsonSchema), z.array(jsonSchema)])
)