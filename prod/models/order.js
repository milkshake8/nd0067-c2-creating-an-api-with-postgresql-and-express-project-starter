"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = require("../database");
class OrderStore {
    async index() {
        try {
            const sql = 'SELECT * FROM orders;';
            const conn = await database_1.client.connect();
            const results = await conn.query(sql);
            conn.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`Unable to get orders. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = `SELECT * FROM orders WHERE id=${id};`;
            const conn = await database_1.client.connect();
            const results = await conn.query(sql);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to get order: ${id}. Error: ${err}`);
        }
    }
    async create(o) {
        //check if the user already exists
        try {
            const sql_user = `SELECT * FROM users WHERE id=${o.user_id};`;
            const conn = await database_1.client.connect();
            const result_user = await conn.query(sql_user);
            const user = result_user.rows[0];
            //add the order if the user exixts
            if (user) {
                const sql = 'INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING *';
                const results = await conn.query(sql, [o.user_id, o.status]);
                conn.release();
                return results.rows[0];
            }
            conn.release();
            return null;
        }
        catch (err) {
            throw new Error(`Unable to create order for the user: ${o.user_id}. Error: ${err}`);
        }
    }
    async update(o) {
        try {
            const sql_user = `SELECT * FROM users WHERE id=${o.user_id};`;
            const conn = await database_1.client.connect();
            const result_user = await conn.query(sql_user);
            const user = result_user.rows[0];
            if (user) {
                const sql = `UPDATE orders SET user_id=${o.user_id}, status='${o.status}' WHERE id=${o.id};`;
                const result = await conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            else {
                conn.release();
                return null;
            }
        }
        catch (err) {
            throw new Error(`Unable to update order ${o.id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.client.connect();
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not delete ordder ${id}. Error: ${err}`);
        }
    }
    async current_order(user_id) {
        try {
            const sql = `SELECT o.id, op.product_id, op.quantity, o.user_id, o.status FROM orders o JOIN order_products op ON o.id=op.order_id WHERE o.user_id=${user_id} AND o.status='active';`;
            const conn = await database_1.client.connect();
            const results = await conn.query(sql);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to get current order of the user:${user_id}. Error: ${err}`);
        }
    }
    async complete_orders(user_id) {
        try {
            const sql = `SELECT o.id, op.product_id, op.quantity, o.user_id, o.status FROM orders o JOIN order_products op ON o.id=op.order_id WHERE o.user_id=${user_id} AND o.status='complete';`;
            const conn = await database_1.client.connect();
            const results = await conn.query(sql);
            conn.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`Unable to get completed orders of user: ${user_id}. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
