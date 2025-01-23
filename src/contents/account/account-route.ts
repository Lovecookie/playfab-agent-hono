import { Hono } from "hono"
import { accountApi } from "@/contents/account/apis/account-api";



export const accountRoute = new Hono()
// .use('*', authMiddleware)
.route('/acnt', accountApi);