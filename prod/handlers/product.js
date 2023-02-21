"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const tkverifier_1 = __importDefault(require("../middlewares/tkverifier"));
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    try {
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (_req, res) => {
    try {
        const product = await store.show(_req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (_req, res) => {
    try {
        const p = {
            name: _req.body.name,
            price: parseInt(_req.body.price),
            category: _req.body.category
        };
        const new_product = await store.create(p);
        res.json(new_product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show_by_category = async (_req, res) => {
    try {
        const products = await store.show_by_category(_req.params.category);
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (_req, res) => {
    const name = _req.body.name;
    const id = parseInt(_req.params.id);
    try {
        await store.update(name, id);
        const product = await store.show(_req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const delete_product = async (_req, res) => {
    const id = _req.params.id;
    try {
        await store.delete(id);
        const result = await store.index();
        res.json(result);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const product_routes = (app) => {
    app.post('/products', tkverifier_1.default, create);
    app.get('/products', index);
    app.get('/products/:id', show);
    app.get('/products/categories/:category', show_by_category);
    app.put('/products/:id', tkverifier_1.default, update);
    app.delete('/products/:id', tkverifier_1.default, delete_product);
};
exports.default = product_routes;
