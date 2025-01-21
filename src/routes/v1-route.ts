import { Hono } from "hono"
import * as accountApi from "@/account/api/account-api";


const v1Router = new Hono().basePath('/api/v1');

v1Router.post('/login', accountApi.login);