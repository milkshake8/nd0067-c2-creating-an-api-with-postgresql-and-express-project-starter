import app from '../../server'
import supertest from 'supertest'
import { Orders } from '../../models/order'
import { User } from '../../models/user'

const request: supertest.SuperTest<supertest.Test> = supertest(app)

describe('orders endpoint testing', () => {
  let token: string
  //create a new user to get a valid token
  beforeAll(async () => {
    const u: User = {
      firstname: 'Aria',
      lastname: 'Snow',
      password: 'noface'
    }
    const res: supertest.Response = await request.post('/users').send(u)
    token = res.body as string
  })

  it('gets /orders endpoint', async () => {
    const response: supertest.Response = await request
      .get('/orders')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body[0].id).toBe(1)
  })
  it('gets /orders/id endpoint', async () => {
    const response: supertest.Response = await request
      .get('/orders/1')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.id).toBe(1)
  })
  it('posts /orders endpoint', async () => {
    const o: Orders = {
      user_id: 2,
      status: 'active'
    }
    const response: supertest.Response = await request
      .post('/orders')
      .send(o)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.user_id).toBe(2)
  })
  it('puts /orders/:id endpoint', async () => {
    const o: Orders = {
      user_id: 2,
      status: 'complete'
    }
    const response: supertest.Response = await request
      .put('/orders/4')
      .send(o)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.status).toBe('complete')
  })
  it('deletes /orders/:id endpoint', async () => {
    const response: supertest.Response = await request
      .delete('/orders/4')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body[3]).toBeUndefined()
  })
  it('gets /current_orders/:user_id endpoint', async () => {
    const response: supertest.Response = await request
      .get('/current_orders/1')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body?.status).toBe('active')
  })
  it('gets /complete_orders endpoint', async () => {
    const response: supertest.Response = await request
      .get('/complete_orders/2')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body[0].status).toBe('complete')
  })

  //drop the created user to make the tests
  afterAll(async () => {
    await request.delete('/users/3').set('Authorization', `Bearer ${token}`)
  })
})
