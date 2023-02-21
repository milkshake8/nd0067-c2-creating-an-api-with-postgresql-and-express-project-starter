"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_js_1 = require("./dashboard.js");
const dashboardRoutes = (app) => {
    app.get('/most_popular_products', most_popular_product);
};
const dashboard = new dashboard_js_1.DashboardQueries();
const most_popular_product = async (_req, res) => {
    const products = await dashboard.most_popular_product();
    res.json(products);
};
exports.default = dashboardRoutes;
