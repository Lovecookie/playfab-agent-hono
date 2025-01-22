import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'

import { Environment } from './config/bindings'
import httpStatus from 'http-status'
import { errorHandler } from './middlewares/error'
import { ApiError } from './utils/api-error'
import { initV1Route } from './route'

const app = new Hono<Environment>()

app.use('*', cors())
app.use('*', logger(), prettyJSON())

app.notFound(() => {
  throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
})

app.onError(errorHandler);

initV1Route(app);

export default app
