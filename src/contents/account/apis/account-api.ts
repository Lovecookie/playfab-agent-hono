import { Hono, Context } from "hono";
import { Environment } from "@/config/bindings";


export const accountApi = new Hono<Environment>()
.post('/login', async (ctx) => {
	const { email, password } = await ctx.req.json<{
		email: string;
		password: string;
	}>();

	return ctx.json(
		{ message: "Login successful", email, password }
	)	
})

.post('/register', async (ctx) => {
	const { email, password } = await ctx.req.json<{
		email: string;
		password: string;
	}>();

	return ctx.json(
		{ message: "Register successful", email, password }
	)
})