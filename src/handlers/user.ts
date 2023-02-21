import express, { Request, Response } from 'express'
import { UserStore, User } from '../models/user'
import token_verifier from '../middlewares/tkverifier'
import jwt from 'jsonwebtoken'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  try {
    const users: User[] = await store.index()
    res.json(users)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const show = async (_req: Request, res: Response) => {
  const id: string = _req.params.id
  try {
    const user: User = await store.show(id)
    res.json(user)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const create = async (_req: Request, res: Response) => {
  const user: User = {
    firstname: _req.body.firstname,
    lastname: _req.body.lastname,
    password: _req.body.password
  }
  try {
    const created_user: User | null = await store.create(user)
    if (created_user != null) {
      var token = jwt.sign(
        { user: created_user },
        process.env.TOKEN_SECRET as string
      )
      res.json(token)
    } else {
      res.send('This user already exists. Try again with a different firstname')
    }
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const update = async (_req: Request, res: Response) => {
  const id: string = _req.params.id
  const new_lastname: string = _req.body.new_lastname
  try {
    await store.update(new_lastname, id)
    const new_user: User = await store.show(id)
    var token = jwt.sign({ user: new_user }, process.env.TOKEN_SECRET as string)
    res.json(token)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const authenticate = async (_req: Request, res: Response) => {
  const firstname: string = _req.body.firstname
  const password: string = _req.body.password
  try {
    const user: User | null = await store.authenticate(firstname, password)
    if (user != null) {
      var token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string)
      res.json(token)
    } else {
      res.send(`Incorrect password for user: ${firstname}`)
    }
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const delete_user = async (_req: Request, res: Response) => {
  const id: string = _req.params.id
  try {
    await store.delete(id)
    const users: User[] = await store.index()
    res.json(users)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const user_routes = (app: express.Application) => {
  app.get('/users', token_verifier, index)
  app.get('/users/:id', token_verifier, show)
  app.post('/users', create)
  app.put('/users/:id', token_verifier, update)
  app.post('/users/:id', authenticate)
  app.delete('/users/:id', token_verifier, delete_user)
}

export default user_routes
