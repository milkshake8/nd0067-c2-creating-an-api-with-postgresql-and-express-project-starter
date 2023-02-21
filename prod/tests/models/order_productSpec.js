"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_product_1 = require("../../models/order_product");
const store = new order_product_1.OrderProductStore();
const op = {
    id: 1,
    order_id: 1,
    product_id: 2,
    quantity: 20
};
describe('Order_product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined;
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined;
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined;
    });
    it('should have an update method', () => {
        expect(store.update).toBeDefined;
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined;
    });
    it('index method should return all the added Produt ordered', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(3);
    });
    it('show method should return an ordered product', async () => {
        const result = await store.show('1');
        expect(result).toEqual(op);
    });
    it('create method should create a new order of a product', async () => {
        const new_op = {
            order_id: 2,
            product_id: 3,
            quantity: 10
        };
        const result = await store.create(new_op);
        expect(result).not.toBeNull;
    });
    it('create method should returns null', async () => {
        const new_op = {
            order_id: 2,
            product_id: 15,
            quantity: 10
        };
        const result = await store.create(new_op);
        expect(result).toBeNull;
    });
    it('should update a ordered product', async () => {
        const new_op = {
            id: 5,
            order_id: 2,
            product_id: 3,
            quantity: 15
        };
        await store.update(new_op);
        const result = await store.show('5');
        expect(result.quantity).toBe(15);
    });
    it('should delete an ordered product', async () => {
        await store.delete('5');
        const result = await store.show('5');
        expect(result).toBeUndefined;
    });
});
