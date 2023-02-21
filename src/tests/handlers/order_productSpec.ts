import app from '../../server'
import supertest from 'supertest'
import { Order_products } from '../../models/order_product'
import { User } from '../../models/user'

const request: supertest.SuperTest<supertest.Test> = supertest(app)

describe('order_products endpoint testing', () => {
  let token: string
  //create a new user to get a valid token
  beforeAll(async () => {
    const u: User = {
      firstname: 'Jhon',
      lastname: 'Snow',
      password: 'imatargaryen'
    }
    const res: supertest.Response = await request.post('/users').send(u)
    token = res.body as string
  })

  it('gets /order_products endpoint', async () => {
    const response: supertest.Response = await request
      .get('/order_products')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body[0]).toBeDefined()
  })
  it('gets /order_products/:id endpoint', async () => {
    const response: supertest.Response = await request
      .get('/order_products/1')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.id).toBe(1)
  })
  it('posts /order_products endpoint', async () => {
    const op: Order_products = {
      order_id: 1,
      product_id: 1,
      quantity: 10
    }
    const response: supertest.Response = await request
      .post('/order_products')
      .send(op)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.order_id).toBe(1)
  })
  it('puts /order_products/:id endpoint', async () => {
    const op: Order_products = {
      order_id: 1,
      product_id: 1,
      quantity: 15
    }
    const response: supertest.Response = await request
      .put('/order_products/5')
      .send(op)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.quantity).toBe(15)
  })

  //drop the created user to make the tests
  afterAll(async () => {
    const response: supertest.Response = await request
      .delete('/users/4')
      .set('Authorization', `Bearer ${token}`)
  })
})
