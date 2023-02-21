"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_product_1 = require("../models/order_product");
const tkverifier_1 = __importDefault(require("../middlewares/tkverifier"));
const store = new order_product_1.OrderProductStore();
const index = async (_req, res) => {
    try {
        const order_products = await store.index();
        res.json(order_products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (_req, res) => {
    const id = _req.params.id;
    try {
        const order_product = await store.show(id);
        res.json(order_product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (_req, res) => {
    const order_product = {
        order_id: _req.body.order_id,
        product_id: _req.body.product_id,
        quantity: _req.body.quantity
    };
    try {
        const new_order_product = await store.create(order_product);
        if (new_order_product != null) {
            res.json(new_order_product);
        }
        else {
            res.send(`Unable to create a new product order: product(${order_product.product_id}) or order(${order_product.order_id}) does not exist`);
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (_req, res) => {
    const order_product = {
        id: parseInt(_req.params.id),
        order_id: _req.body.order_id,
        product_id: _req.body.product_id,
        quantity: _req.body.quantity
    };
    try {
        const result = await store.update(order_product);
        if (result !== null) {
            const new_order_product = await store.show(_req.params.id);
            res.json(new_order_product);
        }
        else {
            res.send(`Unable to update the product order: product(${order_product.product_id}) or order(${order_product.order_id}) does not exist`);
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const delete_op = async (_req, res) => {
    const id = _req.params.id;
    try {
        await store.delete(id);
        const order_products = await store.index();
        res.json(order_products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const order_product_routes = (app) => {
    app.get('/order_products', tkverifier_1.default, index);
    app.get('/order_products/:id', tkverifier_1.default, show);
    app.post('/order_products', tkverifier_1.default, create);
    app.put('/order_products/:id', tkverifier_1.default, update);
    app.delete('/order_products/:id', tkverifier_1.default, delete_op);
};
exports.default = order_product_routes;
