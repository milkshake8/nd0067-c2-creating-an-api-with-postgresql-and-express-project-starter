import { client as Client } from '../database'
import { Product } from './product'
import { Orders } from './order'

export type Order_products = {
  id?: number
  order_id: number
  product_id: number
  quantity: number
}

export class OrderProductStore {
  async index(): Promise<Order_products[]> {
    try {
      const sql = 'SELECT * FROM order_products;'
      const conn = await Client.connect()

      const results = await conn.query(sql)
      conn.release()
      return results.rows
    } catch (err) {
      throw new Error(`Unable to get order_products. Error: ${err}`)
    }
  }
  async show(id: string): Promise<Order_products> {
    try {
      const sql = `SELECT * FROM order_products WHERE id=${id};`
      const conn = await Client.connect()

      const results = await conn.query(sql)
      conn.release()
      return results.rows[0]
    } catch (err) {
      throw new Error(`Unable to get order_products: ${id}. Error: ${err}`)
    }
  }
  async create(op: Order_products): Promise<Order_products | null> {
    try {
      const sql = `INSERT INTO order_products(quantity, order_id, product_id) VALUES(${op.quantity}, ${op.order_id}, ${op.product_id}) RETURNING*`
      const sql_product = `SELECT * FROM products WHERE id=${op.product_id};`
      const sql_order = `SELECT * FROM products WHERE id=${op.order_id};`
      const conn = await Client.connect()
      //Check if the product exists
      const result_product = await conn.query(sql_product)
      const product = result_product.rows[0]

      //Check if the order exists
      const result_order = await conn.query(sql_order)
      const order = result_order.rows[0]
      if (product && order) {
        const result = await conn.query(sql)

        conn.release()
        return result.rows[0]
      }
      conn.release()
      return null
    } catch (err) {
      throw new Error(
        `Could not add product: ${op.product_id} to order: ${op.order_id}. Error: ${err}`
      )
    }
  }
  async update(op: Order_products): Promise<Order_products | null> {
    try {
      const sql = `UPDATE order_products SET order_id=${op.order_id}, product_id=${op.product_id}, quantity=${op.quantity} WHERE id=${op.id}`
      const sql_product = `SELECT * FROM products WHERE id=${op.product_id};`
      const sql_order = `SELECT * FROM products WHERE id=${op.order_id};`
      const conn = await Client.connect()

      //Check if the product exists
      const result_product = await conn.query(sql_product)
      const product: Product = result_product.rows[0]

      //Check if both the order and the product exist
      const result_order = await conn.query(sql_order)
      const order: Orders = result_order.rows[0]

      if (product && order) {
        const result = await conn.query(sql)
        conn.release()
        return result.rows[0]
      } else {
        conn.release()
        return null
      }
    } catch (err) {
      throw new Error(`Unable to update order_products ${op.id}. Error: ${err}`)
    }
  }
  async delete(id: string): Promise<Order_products> {
    try {
      const sql = 'DELETE FROM order_products WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      const order_product = result.rows[0]

      conn.release()

      return order_product
    } catch (err) {
      throw new Error(`Could not delete order_products ${id}. Error: ${err}`)
    }
  }
}
