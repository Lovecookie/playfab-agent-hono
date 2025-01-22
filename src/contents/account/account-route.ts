import { Hono } from "hono"
import * as accountApi from "@/contents/account/apis/account-api";



export const accountRoute = new Hono()
// .use('*', authMiddleware)
.route('/acnt', accountApi.accountApi);