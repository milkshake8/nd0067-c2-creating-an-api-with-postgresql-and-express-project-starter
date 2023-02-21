"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductStore = void 0;
const database_1 = require("../database");
class OrderProductStore {
    async index() {
        try {
            const sql = 'SELECT * FROM order_products;';
            const conn = await database_1.client.connect();
            const results = await conn.query(sql);
            conn.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`Unable to get order_products. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = `SELECT * FROM order_products WHERE id=${id};`;
            const conn = await database_1.client.connect();
            const results = await conn.query(sql);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to get order_products: ${id}. Error: ${err}`);
        }
    }
    async create(op) {
        try {
            const sql = `INSERT INTO order_products(quantity, order_id, product_id) VALUES(${op.quantity}, ${op.order_id}, ${op.product_id}) RETURNING*`;
            const sql_product = `SELECT * FROM products WHERE id=${op.product_id};`;
            const sql_order = `SELECT * FROM products WHERE id=${op.order_id};`;
            const conn = await database_1.client.connect();
            //Check if the product exists
            const result_product = await conn.query(sql_product);
            const product = result_product.rows[0];
            //Check if the order exists
            const result_order = await conn.query(sql_order);
            const order = result_order.rows[0];
            if (product && order) {
                const result = await conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            conn.release();
            return null;
        }
        catch (err) {
            throw new Error(`Could not add product: ${op.product_id} to order: ${op.order_id}. Error: ${err}`);
        }
    }
    async update(op) {
        try {
            const sql = `UPDATE order_products SET order_id=${op.order_id}, product_id=${op.product_id}, quantity=${op.quantity} WHERE id=${op.id}`;
            const sql_product = `SELECT * FROM products WHERE id=${op.product_id};`;
            const sql_order = `SELECT * FROM products WHERE id=${op.order_id};`;
            const conn = await database_1.client.connect();
            //Check if the product exists
            const result_product = await conn.query(sql_product);
            const product = result_product.rows[0];
            //Check if both the order and the product exist
            const result_order = await conn.query(sql_order);
            const order = result_order.rows[0];
            if (product && order) {
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
            throw new Error(`Unable to update order_products ${op.id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM order_products WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.client.connect();
            const result = await conn.query(sql, [id]);
            const order_product = result.rows[0];
            conn.release();
            return order_product;
        }
        catch (err) {
            throw new Error(`Could not delete order_products ${id}. Error: ${err}`);
        }
    }
}
exports.OrderProductStore = OrderProductStore;
