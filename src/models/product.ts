import { client as Client } from '../database'

//shape of a product
export type Product = {
  id?: number
  name: string
  price: number
  category: string
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products;'
      const conn = await Client.connect()

      const results = await conn.query(sql)
      conn.release()
      return results.rows
    } catch (err) {
      throw new Error(`Unable to get products. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = `SELECT * FROM products WHERE id=${id};`
      const conn = await Client.connect()

      const results = await conn.query(sql)
      conn.release()
      return results.rows[0]
    } catch (err) {
      throw new Error(`Unable to get book: ${id}. Error: ${err}`)
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *'
      const conn = await Client.connect()

      const results = await conn.query(sql, [p.name, p.price, p.category])
      conn.release()

      return results.rows[0]
    } catch (err) {
      throw new Error(`Unable to create product: ${p.name}. Error: ${err}`)
    }
  }

  async show_by_category(cat: string): Promise<Product[]> {
    try {
      const sql = `SELECT * FROM products WHERE category='${cat}'`
      const conn = await Client.connect()

      const results = await conn.query(sql)
      conn.release()

      return results.rows
    } catch (err) {
      throw new Error(
        `Unable to show products with category: ${cat}. Error: ${err}`
      )
    }
  }
  async update(name: string, id: number): Promise<Product[]> {
    try {
      const sql = `UPDATE products SET name ='${name}' WHERE id =${id};`
      const conn = await Client.connect()

      const result = await conn.query(sql)
      conn.release()
      const p: Product[] = result.rows
      return p
    } catch (err) {
      throw new Error(`Unbale to update product: ${id}. Error: ${err}`)
    }
  }
  async delete(product_id: string): Promise<Product> {
    try {
      const sql = `DELETE FROM products WHERE id=${product_id};`
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql)

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not delete product ${product_id}. Error: ${err}`)
    }
  }
}
