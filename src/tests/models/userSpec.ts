import { User, UserStore } from '../../models/user'

const store = new UserStore()

describe('User model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })
  it('should have a show method', () => {
    expect(store.show).toBeDefined
  })
  it('should have a create method', () => {
    expect(store.create).toBeDefined
  })
  it('should have a authenticate method', () => {
    expect(store.authenticate).toBeDefined
  })

  it('index method should return users', async () => {
    const result = await store.index()
    expect(result.length).toBeGreaterThan(1)
  })
  it('show method should return a user', async () => {
    const result = await store.show('1')
    expect(result.id).toBe(1)
  })
  it('create method should create a new user', async () => {
    const u: User = {
      firstname: 'Alex',
      lastname: 'Johnson',
      password: 'alexpass'
    }
    const result = await store.create(u)
    expect(result?.firstname).toEqual('Alex')
    expect(result?.lastname).toEqual('Johnson')
  })
  it('should update a user', async () => {
    await store.update('Carrington', '1')
    const result = await store.show('1')
    expect(result.lastname).toEqual('Carrington')
  })
  it('authenticate method should return a user for correct password', async () => {
    const result = await store.authenticate('Alex', 'alexpass')
    expect(result).not.toBeNull
  })
  it('authenticate method should return null for incorrect password', async () => {
    const result = await store.authenticate('Alex', 'johnpass')
    expect(result).toBeNull
  })
  it('should delete a user', async () => {
    await store.delete('3')
    const result = await store.show('3')
    expect(result).toBeUndefined()
  })
})
