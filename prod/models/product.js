"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = require("../database");
class ProductStore {
    async index() {
        try {
            const sql = 'SELECT * FROM products;';
            const conn = await database_1.client.connect();
            const results = await conn.query(sql);
            conn.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`Unable to get products. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = `SELECT * FROM products WHERE id=${id};`;
            const conn = await database_1.client.connect();
            const results = await conn.query(sql);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to get book: ${id}. Error: ${err}`);
        }
    }
    async create(p) {
        try {
            const sql = 'INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.client.connect();
            const results = await conn.query(sql, [p.name, p.price, p.category]);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to create product: ${p.name}. Error: ${err}`);
        }
    }
    async show_by_category(cat) {
        try {
            const sql = `SELECT * FROM products WHERE category='${cat}'`;
            const conn = await database_1.client.connect();
            const results = await conn.query(sql);
            conn.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`Unable to show products with category: ${cat}. Error: ${err}`);
        }
    }
    async update(name, id) {
        try {
            const sql = `UPDATE products SET name ='${name}' WHERE id =${id};`;
            const conn = await database_1.client.connect();
            const result = await conn.query(sql);
            conn.release();
            const p = result.rows;
            return p;
        }
        catch (err) {
            throw new Error(`Unbale to update product: ${id}. Error: ${err}`);
        }
    }
    async delete(product_id) {
        try {
            const sql = `DELETE FROM products WHERE id=${product_id};`;
            // @ts-ignore
            const conn = await database_1.client.connect();
            const result = await conn.query(sql);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not delete product ${product_id}. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
