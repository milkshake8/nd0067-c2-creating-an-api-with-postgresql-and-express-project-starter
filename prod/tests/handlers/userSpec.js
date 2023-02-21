"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe('user endpoint testing', () => {
    let token;
    it('create a user', async () => {
        const u = {
            firstname: 'Rob',
            lastname: 'Stark',
            password: 'northking'
        };
        const response = await request.post('/users').send(u);
        token = response.body;
        console.log(token);
        expect(response.status).toBe(200);
    });
    it('gets the /users endpoint', async () => {
        const response = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body[0].id).toBe(1);
    });
    it('gets the /users/:id endpoint', async () => {
        const response = await request
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });
    it('puts the /users/:id endpoint', async () => {
        const response = await request
            .put('/users/1')
            .send({ lastname: 'Mustang' })
            .set('Authorization', `Bearer ${token}`);
        token = response.body;
        expect(response.status).toBe(200);
    });
    it('posts the /users/:id endpoint', async () => {
        const response = await request
            .post('/users/3')
            .send({ firstname: 'Rob', password: 'northking' });
        token = response.body;
        expect(response.status).toBe(200);
    });
    it('deletes the /users/:id endpoint', async () => {
        const response = await request
            .delete('/users/3')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined;
    });
});
