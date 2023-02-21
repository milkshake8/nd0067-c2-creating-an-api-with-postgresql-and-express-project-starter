import app from '../../server'
import supertest from 'supertest'
import { Product } from '../../models/product'
import { User } from '../../models/user'

const request: supertest.SuperTest<supertest.Test> = supertest(app)

describe('product endpoint testing', () => {
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
  it('gets the  /products endpoint', async () => {
    const response: supertest.Response = await request.get('/products')
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined
  })
  it('gets the /products/:id', async () => {
    const response: supertest.Response = await request.get('/products/1')
    expect(response.status).toBe(200)
    expect(response.body.id).toBe(1)
    expect(response.body.name).toBe('shirt')
    expect(response.body.price).toBe(2000)
    expect(response.body.category).toBe('textiles')
  })
  it('posts the /products endpoint', async () => {
    const p: Product = {
      name: 'computer',
      price: 220000,
      category: 'electronics'
    }
    const response: supertest.Response = await request
      .post('/products')
      .send(p)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('computer')
    expect(response.body.price).toBe(220000)
    expect(response.body.category).toBe('electronics')
  })
  it('gets /products/categories/:category endpoint', async () => {
    const response: supertest.Response = await request.get(
      '/products/categories/textiles'
    )
    expect(response.status).toBe(200)
    expect(response.body[0].category).toBe('textiles')
  })
  it('puts /products/:id endpoint', async () => {
    const response: supertest.Response = await request
      .put('/products/1')
      .send({ name: 't-shirt' })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('t-shirt')
  })
  it('deletes /products/:id endpoint', async () => {
    const response: supertest.Response = await request
      .delete('/products/4')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body[3]).toBeUndefined()
  })
  //drop the user after all the test
  afterAll(async () => {
    await request.delete('/users/3').set('Authorization', `Bearer ${token}`)
  })
})
