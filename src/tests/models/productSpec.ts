import { Product, ProductStore } from '../../models/product'

const store = new ProductStore()
const p: Product = {
  name: 'burger',
  price: 1500,
  category: 'food'
}

describe('Product model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })
  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })
  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })
  it('should have a show_by_category method', () => {
    expect(store.show_by_category).toBeDefined()
  })
  it('should have an update method', () => {
    expect(store.update).toBeDefined()
  })
  it('should have a delete method', () => {
    expect(store.delete).toBeDefined()
  })

  it('index method should return 3 objects', async () => {
    const result = await store.index()
    expect(result.length).toBe(3)
  })
  it('show method should return a book', async () => {
    const result = await store.show('1')
    expect(result.id).toEqual(1)
  })
  it('create method should create a new product with an id greater than 3', async () => {
    const result = await store.create(p)
    expect(result.id).toBeGreaterThan(3)
  })
  it('show_by_category method should return products', async () => {
    const cat: string = 'electronics'
    const result = await store.show_by_category(cat)
    expect(result[0].category).toEqual('electronics')
  })
  it('should update a product', async () => {
    await store.update('Hamburger', 5)
    const result = await store.show('5')
    expect(result).toEqual({
      id: 5,
      name: 'Hamburger',
      price: 1500,
      category: 'food'
    })
  })
  it('should delete a product', async () => {
    await store.delete('3')
    const result = await store.index()
    expect(result.length).toBe(3)
  })
})
