import express, { Request, Response } from 'express'
import { OrderProductStore, Order_products } from '../models/order_product'
import token_verifier from '../middlewares/tkverifier'

const store = new OrderProductStore()

const index = async (_req: Request, res: Response) => {
  try {
    const order_products: Order_products[] = await store.index()
    res.json(order_products)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const show = async (_req: Request, res: Response) => {
  const id: string = _req.params.id
  try {
    const order_product: Order_products = await store.show(id)
    res.json(order_product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const create = async (_req: Request, res: Response) => {
  const order_product: Order_products = {
    order_id: _req.body.order_id,
    product_id: _req.body.product_id,
    quantity: _req.body.quantity
  }
  try {
    const new_order_product: Order_products | null = await store.create(
      order_product
    )
    if (new_order_product != null) {
      res.json(new_order_product)
    } else {
      res.send(
        `Unable to create a new product order: product(${order_product.product_id}) or order(${order_product.order_id}) does not exist`
      )
    }
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const update = async (_req: Request, res: Response) => {
  const order_product: Order_products = {
    id: parseInt(_req.params.id),
    order_id: _req.body.order_id,
    product_id: _req.body.product_id,
    quantity: _req.body.quantity
  }
  try {
    const result = await store.update(order_product)
    if (result !== null) {
      const new_order_product: Order_products = await store.show(_req.params.id)
      res.json(new_order_product)
    } else {
      res.send(
        `Unable to update the product order: product(${order_product.product_id}) or order(${order_product.order_id}) does not exist`
      )
    }
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const delete_op = async (_req: Request, res: Response) => {
  const id: string = _req.params.id
  try {
    await store.delete(id)
    const order_products: Order_products[] = await store.index()
    res.json(order_products)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const order_product_routes = (app: express.Application) => {
  app.get('/order_products', token_verifier, index)
  app.get('/order_products/:id', token_verifier, show)
  app.post('/order_products', token_verifier, create)
  app.put('/order_products/:id', token_verifier, update)
  app.delete('/order_products/:id', token_verifier, delete_op)
}

export default order_product_routes
