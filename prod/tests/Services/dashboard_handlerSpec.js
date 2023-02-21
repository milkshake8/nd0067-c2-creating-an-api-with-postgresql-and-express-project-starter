"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe('Dashboard endpoint testing', () => {
    it('gets /most_popular_products endpoint', async () => {
        const response = await request.get('/most_popular_products');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});
