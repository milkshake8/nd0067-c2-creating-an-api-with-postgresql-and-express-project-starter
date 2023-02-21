import app from '../../server'
import supertest from 'supertest'

const request: supertest.SuperTest<supertest.Test> = supertest(app)

describe('Dashboard endpoint testing', () => {
  it('gets /most_popular_products endpoint', async () => {
    const response: supertest.Response = await request.get(
      '/most_popular_products'
    )
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
  })
})
