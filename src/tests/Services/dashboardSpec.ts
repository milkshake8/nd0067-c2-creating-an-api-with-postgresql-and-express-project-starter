import { DashboardQueries } from '../../Services/dashboard'

const store = new DashboardQueries()

describe('Testing the dashboard', () => {
  it('should have a most_popular_product method', () => {
    expect(store.most_popular_product).toBeDefined()
  })
  it('most_popular_product method should return more than 1 products', async () => {
    const result = await store.most_popular_product()
    expect(result.length).toBeGreaterThan(1)
  })
})
