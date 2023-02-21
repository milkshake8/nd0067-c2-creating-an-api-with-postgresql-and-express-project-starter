import { client as Client } from '../database.js'

export class DashboardQueries {
  //Get five most popular book
  async most_popular_product(): Promise<
    { name: string; numb_of_orders: string }[]
  > {
    try {
      const sql =
        'SELECT p.name, COUNT(*) AS "numb_of_orders" FROM products p JOIN order_products op ON p.id=op.product_id GROUP BY p.name ORDER BY COUNT(*) DESC LIMIT 5;'
      const conn = await Client.connect()

      const result = await conn.query(sql)

      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Unable to get most popular products. Error: ${err}`)
    }
  }
}
