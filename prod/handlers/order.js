"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const tkverifier_1 = __importDefault(require("../middlewares/tkverifier"));
const store = new order_1.OrderStore();
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (_req, res) => {
    const id = _req.params.id;
    try {
        const order = await store.show(id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (_req, res) => {
    const order = {
        user_id: parseInt(_req.body.user_id),
        status: _req.body.status
    };
    try {
        const new_order = await store.create(order);
        if (new_order != null) {
            res.json(new_order);
        }
        else {
            res.send(`Unable to find user with id: ${order.user_id}`);
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (_req, res) => {
    try {
        const id = parseInt(_req.params.id);
        const order = {
            id: id,
            user_id: _req.body.user_id,
            status: _req.body.status
        };
        const result = await store.update(order);
        if (result !== null) {
            const updated_order = await store.show(_req.params.id);
            res.json(updated_order);
        }
        else {
            res.send(`Unable to find user with the id: ${order.user_id}`);
        }
    }
    catch (err) {
        res.status(400);
        res.send(`Error: ${err}`);
    }
};
const delete_order = async (_req, res) => {
    const id = _req.params.id;
    try {
        await store.delete(id);
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const current_order = async (_req, res) => {
    const user_id = _req.params.user_id;
    try {
        const curr_order = await store.current_order(user_id);
        res.json(curr_order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const complete_orders = async (_req, res) => {
    const user_id = _req.params.user_id;
    try {
        const comp_orders = await store.complete_orders(user_id);
        res.json(comp_orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const order_routes = (app) => {
    app.get('/orders', tkverifier_1.default, index);
    app.get('/orders/:id', tkverifier_1.default, show);
    app.post('/orders', tkverifier_1.default, create);
    app.put('/orders/:id', tkverifier_1.default, update);
    app.delete('/orders/:id', tkverifier_1.default, delete_order);
    app.get('/current_orders/:user_id', tkverifier_1.default, current_order);
    app.get('/complete_orders/:user_id', tkverifier_1.default, complete_orders);
};
exports.default = order_routes;
