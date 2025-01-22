import { Hono } from "hono"


import { Environment } from "@/config/bindings";
import { accountRoute } from "@/contents/account/account-route";


export function initV1Route(app: Hono<Environment>) {
	const v1 = '/v1';
		
	app.route(v1, accountRoute);
}