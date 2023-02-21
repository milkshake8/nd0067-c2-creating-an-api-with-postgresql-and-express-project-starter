"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe('orders endpoint testing', () => {
    let token;
    //create a new user to get a valid token
    beforeAll(async () => {
        const u = {
            firstname: 'Aria',
            lastname: 'Snow',
            password: 'noface'
        };
        const res = await request.post('/users').send(u);
        token = res.body;
    });
    it('gets /orders endpoint', async () => {
        const response = await request
            .get('/orders')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body[0].id).toBe(1);
    });
    it('gets /orders/id endpoint', async () => {
        const response = await request
            .get('/orders/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });
    it('posts /orders endpoint', async () => {
        const o = {
            user_id: 2,
            status: 'active'
        };
        const response = await request
            .post('/orders')
            .send(o)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.user_id).toBe(2);
    });
    it('puts /orders/:id endpoint', async () => {
        const o = {
            user_id: 2,
            status: 'complete'
        };
        const response = await request
            .put('/orders/4')
            .send(o)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('complete');
    });
    it('deletes /orders/:id endpoint', async () => {
        const response = await request
            .delete('/orders/4')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body[3]).toBeUndefined();
    });
    it('gets /current_orders/:user_id endpoint', async () => {
        const response = await request
            .get('/current_orders/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body?.status).toBe('active');
    });
    it('gets /complete_orders endpoint', async () => {
        const response = await request
            .get('/complete_orders/2')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body[0].status).toBe('complete');
    });
    //drop the created user to make the tests
    afterAll(async () => {
        await request.delete('/users/3').set('Authorization', `Bearer ${token}`);
    });
});
