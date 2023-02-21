"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_js_1 = require("../database.js");
class DashboardQueries {
    //Get five most popular book
    async most_popular_product() {
        try {
            const sql = 'SELECT p.name, COUNT(*) AS "numb_of_orders" FROM products p JOIN order_products op ON p.id=op.product_id GROUP BY p.name ORDER BY COUNT(*) DESC LIMIT 5;';
            const conn = await database_js_1.client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Unable to get most popular products. Error: ${err}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;
