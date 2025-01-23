import { Hono } from "hono";
import { Environment } from "@/config/bindings";


export const manageApi = new Hono<Environment>()
.post('/usr', async (ctx) => {
	const { email, password } = await ctx.req.json<{
		email: string;
		password: string;
	}>();

	return ctx.json(
		{ message: "User successful", email, password }
	)	
})

.post('/setting', async (ctx) => {
	const { email, password } = await ctx.req.json<{
		email: string;
		password: string;
	}>();

	return ctx.json(
		{ message: "Setting successful", email, password }
	)
})