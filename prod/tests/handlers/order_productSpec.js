"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe('order_products endpoint testing', () => {
    let token;
    //create a new user to get a valid token
    beforeAll(async () => {
        const u = {
            firstname: 'Jhon',
            lastname: 'Snow',
            password: 'imatargaryen'
        };
        const res = await request.post('/users').send(u);
        token = res.body;
    });
    it('gets /order_products endpoint', async () => {
        const response = await request
            .get('/order_products')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body[0]).toBeDefined();
    });
    it('gets /order_products/:id endpoint', async () => {
        const response = await request
            .get('/order_products/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });
    it('posts /order_products endpoint', async () => {
        const op = {
            order_id: 1,
            product_id: 1,
            quantity: 10
        };
        const response = await request
            .post('/order_products')
            .send(op)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.order_id).toBe(1);
    });
    it('puts /order_products/:id endpoint', async () => {
        const op = {
            order_id: 1,
            product_id: 1,
            quantity: 15
        };
        const response = await request
            .put('/order_products/5')
            .send(op)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.quantity).toBe(15);
    });
    //drop the created user to make the tests
    afterAll(async () => {
        const response = await request
            .delete('/users/4')
            .set('Authorization', `Bearer ${token}`);
    });
});
