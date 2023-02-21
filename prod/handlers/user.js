"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const tkverifier_1 = __importDefault(require("../middlewares/tkverifier"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UserStore();
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (_req, res) => {
    const id = _req.params.id;
    try {
        const user = await store.show(id);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (_req, res) => {
    const user = {
        firstname: _req.body.firstname,
        lastname: _req.body.lastname,
        password: _req.body.password
    };
    try {
        const created_user = await store.create(user);
        if (created_user != null) {
            var token = jsonwebtoken_1.default.sign({ user: created_user }, process.env.TOKEN_SECRET);
            res.json(token);
        }
        else {
            res.send('This user already exists. Try again with a different firstname');
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (_req, res) => {
    const id = _req.params.id;
    const new_lastname = _req.body.new_lastname;
    try {
        await store.update(new_lastname, id);
        const new_user = await store.show(id);
        var token = jsonwebtoken_1.default.sign({ user: new_user }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const authenticate = async (_req, res) => {
    const firstname = _req.body.firstname;
    const password = _req.body.password;
    try {
        const user = await store.authenticate(firstname, password);
        if (user != null) {
            var token = jsonwebtoken_1.default.sign({ user: user }, process.env.TOKEN_SECRET);
            res.json(token);
        }
        else {
            res.send(`Incorrect password for user: ${firstname}`);
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const delete_user = async (_req, res) => {
    const id = _req.params.id;
    try {
        await store.delete(id);
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const user_routes = (app) => {
    app.get('/users', tkverifier_1.default, index);
    app.get('/users/:id', tkverifier_1.default, show);
    app.post('/users', create);
    app.put('/users/:id', tkverifier_1.default, update);
    app.post('/users/:id', authenticate);
    app.delete('/users/:id', tkverifier_1.default, delete_user);
};
exports.default = user_routes;
