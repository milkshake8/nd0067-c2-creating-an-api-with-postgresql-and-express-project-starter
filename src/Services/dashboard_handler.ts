import express, { Request, Response } from 'express'
import { DashboardQueries } from './dashboard.js'

const dashboardRoutes = (app: express.Application) => {
  app.get('/most_popular_products', most_popular_product)
}

const dashboard = new DashboardQueries()

const most_popular_product = async (_req: Request, res: Response) => {
  const products = await dashboard.most_popular_product()
  res.json(products)
}

export default dashboardRoutes
