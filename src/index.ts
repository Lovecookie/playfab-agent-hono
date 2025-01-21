import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE']

  })
)

app.use('*', logger(), prettyJSON())


// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })

export default app
