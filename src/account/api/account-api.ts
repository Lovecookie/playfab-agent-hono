import { Context } from "hono";


export const login = async (c: Context) => {
	const {email, password} = await c.req.json<{
		email: string;
		password: string;
	}>();

	
	return c.json(
		{ message: "Login successful", email, password }
	)
}

export const register = async (c: Context) => {
	const { email, password } = await c.req.json<{
		email: string;
		password: string;
	}>();
	
}