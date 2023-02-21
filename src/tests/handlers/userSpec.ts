import app from '../../server'
import supertest from 'supertest'
import { User } from '../../models/user'

const request: supertest.SuperTest<supertest.Test> = supertest(app)

describe('user endpoint testing', () => {
  let token: string
  it('create a user', async () => {
    const u: User = {
      firstname: 'Rob',
      lastname: 'Stark',
      password: 'northking'
    }
    const response: supertest.Response = await request.post('/users').send(u)
    token = response.body as string
    console.log(token)
    expect(response.status).toBe(200)
  })
  it('gets the /users endpoint', async () => {
    const response: supertest.Response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body[0].id).toBe(1)
  })
  it('gets the /users/:id endpoint', async () => {
    const response: supertest.Response = await request
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.id).toBe(1)
  })
  it('puts the /users/:id endpoint', async () => {
    const response: supertest.Response = await request
      .put('/users/1')
      .send({ lastname: 'Mustang' })
      .set('Authorization', `Bearer ${token}`)
    token = response.body as string
    expect(response.status).toBe(200)
  })
  it('posts the /users/:id endpoint', async () => {
    const response: supertest.Response = await request
      .post('/users/3')
      .send({ firstname: 'Rob', password: 'northking' })
    token = response.body as string
    expect(response.status).toBe(200)
  })
  it('deletes the /users/:id endpoint', async () => {
    const response: supertest.Response = await request
      .delete('/users/3')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined
  })
})
