import { Hono } from "hono"
import { manageApi } from "@/contents/manage/apis/manage-api";



export const manageRoute = new Hono()
// .use('*', authMiddleware)
.route('/mng', manageApi);