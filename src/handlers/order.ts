import express, { Request, Response } from 'express'
import { OrderStore, Orders, OrderProducts1 } from '../models/order'
import token_verifier from '../middlewares/tkverifier'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  try {
    const orders: Orders[] = await store.index()
    res.json(orders)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const show = async (_req: Request, res: Response) => {
  const id: string = _req.params.id
  try {
    const order: Orders = await store.show(id)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const create = async (_req: Request, res: Response) => {
  const order: Orders = {
    user_id: parseInt(_req.body.user_id),
    status: _req.body.status
  }
  try {
    const new_order: Orders | null = await store.create(order)
    if (new_order != null) {
      res.json(new_order)
    } else {
      res.send(`Unable to find user with id: ${order.user_id}`)
    }
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const update = async (_req: Request, res: Response) => {
  try {
    const id: number = parseInt(_req.params.id)
    const order: Orders = {
      id: id,
      user_id: _req.body.user_id,
      status: _req.body.status
    }
    const result: Orders | null = await store.update(order)
    if (result !== null) {
      const updated_order = await store.show(_req.params.id)
      res.json(updated_order)
    } else {
      res.send(`Unable to find user with the id: ${order.user_id}`)
    }
  } catch (err) {
    res.status(400)
    res.send(`Error: ${err}`)
  }
}
const delete_order = async (_req: Request, res: Response) => {
  const id: string = _req.params.id
  try {
    await store.delete(id)
    const orders: Orders[] = await store.index()
    res.json(orders)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const current_order = async (_req: Request, res: Response) => {
  const user_id: string = _req.params.user_id
  try {
    const curr_order: OrderProducts1 = await store.current_order(user_id)
    res.json(curr_order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const complete_orders = async (_req: Request, res: Response) => {
  const user_id: string = _req.params.user_id
  try {
    const comp_orders: OrderProducts1[] = await store.complete_orders(user_id)
    res.json(comp_orders)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const order_routes = (app: express.Application) => {
  app.get('/orders', token_verifier, index)
  app.get('/orders/:id', token_verifier, show)
  app.post('/orders', token_verifier, create)
  app.put('/orders/:id', token_verifier, update)
  app.delete('/orders/:id', token_verifier, delete_order)
  app.get('/current_orders/:user_id', token_verifier, current_order)
  app.get('/complete_orders/:user_id', token_verifier, complete_orders)
}

export default order_routes
