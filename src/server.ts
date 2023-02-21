import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import product_routes from './handlers/product'
import user_routes from './handlers/user'
import order_routes from './handlers/order'
import order_product_routes from './handlers/order_product'
import dashboardRoutes from './Services/dashboard_handler'

const app: express.Application = express()
const address: string = '0.0.0.0:3000'
const corsOptions = {
  origin: 'http://someotherdomain.com',
  optionsSuccessStatus: 200
}

app.use(bodyParser.json())
app.use(cors(corsOptions))

app.get('/', function (req: Request, res: Response) {
  res.send(
    '<h1>Welcome to the storefront API</h1><p>Go to the Readme.md file to see the routes</p>'
  )
})

product_routes(app)
user_routes(app)
order_routes(app)
order_product_routes(app)
dashboardRoutes(app)

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})

export default app
