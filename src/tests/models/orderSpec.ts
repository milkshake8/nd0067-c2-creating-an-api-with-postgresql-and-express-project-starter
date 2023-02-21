import { Orders, OrderProducts1, OrderStore } from '../../models/order.js'

const store = new OrderStore()
const order: OrderProducts1 = {
  id: 1,
  user_id: 1,
  product_id: 2,
  quantity: 20,
  status: 'active'
}

describe('Order Model', () => {
  it('should have an current_order method', () => {
    expect(store.current_order).toBeDefined()
  })
  it('should have an complete_orders method', () => {
    expect(store.complete_orders).toBeDefined()
  })

  it('index method should return 3 orders', async () => {
    const result = await store.index()
    expect(result.length).toBe(3)
  })
  it('show method should return a specific order', async () => {
    const result = await store.show('2')
    expect(result.id).toEqual(2)
  })
  it('create method should create a new order', async () => {
    const o: Orders = {
      user_id: 2,
      status: 'complete'
    }
    const result = await store.create(o)
    expect(result).not.toBeNull
  })
  it('create method should return null', async () => {
    const o: Orders = {
      user_id: 3,
      status: 'complete'
    }
    const result = await store.create(o)
    expect(result).toBeNull
  })
  it('update method should update an order', async () => {
    const o2: Orders = {
      id: 1,
      user_id: 2,
      status: 'active'
    }
    await store.update(o2)
    const result = await store.show('1')
    expect(result.user_id).toBe(2)
    expect(result.status).toBe('active')
  })
  it('update method should return null', async () => {
    const o2: Orders = {
      id: 4,
      user_id: 4,
      status: 'complete'
    }
    const result = await store.update(o2)
    expect(result).toBeNull
  })
  it('delete method should delete an order', async () => {
    await store.delete('4')
    const result = await store.show('4')
    expect(result).toBeUndefined()
  })

  it('current_order method should return the current order', async () => {
    const result = await store.current_order('2')
    expect(result.status).toEqual('active')
  })
  it('complete_orders method should return the completed orders', async () => {
    const result = await store.complete_orders('1')
    expect(result.length).toBeGreaterThan(1)
  })
})
