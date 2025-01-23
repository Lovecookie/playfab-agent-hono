import { Hono } from "hono"


import { Environment } from "@/config/bindings";
import { accountRoute } from "@/contents/account/account-route";
import { manageRoute } from "@/contents/manage/manage-route";


export function initV1Route(app: Hono<Environment>) {
	const v1 = '/v1';

	app
	.route(v1, accountRoute)
	.route(v1, manageRoute);
}