import { client as Client } from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

//Import environment variables for hashing & salting
dotenv.config()
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env
const pepper = BCRYPT_PASSWORD
const saltRounds = SALT_ROUNDS

//Create a user shape
export type User = {
  id?: number
  firstname: string
  lastname: string
  password: string
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users'
      const conn = await Client.connect()

      const results = await conn.query(sql)
      conn.release()

      return results.rows
    } catch (err) {
      throw new Error(`Unable to get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = `SELECT * FROM users WHERE id=${id}`
      const conn = await Client.connect()

      const results = await conn.query(sql)
      conn.release()

      return results.rows[0]
    } catch (err) {
      throw new Error(`Unable to get user:${id}. Error: ${err}`)
    }
  }

  async create(u: User): Promise<User | null> {
    try {
      //Hashing the given password for more secure
      const password_digest = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      )

      const sql =
        'INSERT INTO users(firstname, lastname, password) VALUES($1, $2, $3) RETURNING *'
      const sql_check = `SELECT * FROM users WHERE firstname='${u.firstname}'`
      const conn = await Client.connect()

      //check if a user with this firstname already exist
      const result_check = await conn.query(sql_check)

      if (!result_check.rows[0]) {
        const results = await conn.query(sql, [
          u.firstname,
          u.lastname,
          password_digest
        ])
        conn.release()

        return results.rows[0]
      } else {
        console.log('a user with this firstname already exists')
        return null
      }
    } catch (err) {
      throw new Error(`Could not create user: ${u.firstname}. Error: ${err}`)
    }
  }
  async update(new_lastname: string, id: string): Promise<User> {
    try {
      const sql = `UPDATE users SET lastname='${new_lastname}' WHERE id=${id};`
      const conn = await Client.connect()

      const result = await conn.query(sql)
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `Unable to update the lastname of the user: ${id}. Error: ${err}`
      )
    }
  }
  async authenticate(
    firstname: string,
    password: string
  ): Promise<User | null> {
    try {
      const conn = await Client.connect()
      const sql = `SELECT * FROM users WHERE firstname='${firstname}'`
      //@ts-ignore
      const result = await conn.query(sql)
      console.log(password + pepper)

      if (result.rows) {
        const user: User = result.rows[0]
        console.log(user)

        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user
        }
      }
      return null
    } catch (err) {
      throw new Error(
        `Could not find user: ${firstname} with password: ${password}. Error: ${err}`
      )
    }
  }
  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`)
    }
  }
}
