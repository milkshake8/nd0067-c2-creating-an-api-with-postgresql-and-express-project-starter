import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import token_verifier from '../middlewares/tkverifier'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  const products: Product[] = await store.index()
  try {
    res.json(products)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const show = async (_req: Request, res: Response) => {
  try {
    const product = await store.show(_req.params.id)
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const create = async (_req: Request, res: Response) => {
  try {
    const p: Product = {
      name: _req.body.name,
      price: parseInt(_req.body.price),
      category: _req.body.category
    }
    const new_product = await store.create(p)
    res.json(new_product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const show_by_category = async (_req: Request, res: Response) => {
  try {
    const products = await store.show_by_category(_req.params.category)
    res.json(products)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const update = async (_req: Request, res: Response) => {
  const name: string = _req.body.name
  const id: number = parseInt(_req.params.id)
  try {
    await store.update(name, id)
    const product: Product = await store.show(_req.params.id)
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const delete_product = async (_req: Request, res: Response) => {
  const id: string = _req.params.id
  try {
    await store.delete(id)
    const result: Product[] = await store.index()
    res.json(result)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const product_routes = (app: express.Application) => {
  app.post('/products', token_verifier, create)
  app.get('/products', index)
  app.get('/products/:id', show)
  app.get('/products/categories/:category', show_by_category)
  app.put('/products/:id', token_verifier, update)
  app.delete('/products/:id', token_verifier, delete_product)
}

export default product_routes
