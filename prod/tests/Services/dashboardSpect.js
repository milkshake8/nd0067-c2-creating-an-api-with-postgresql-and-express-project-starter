"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../../Services/dashboard");
const store = new dashboard_1.DashboardQueries();
describe("Testing the dashboard", () => {
    it("should have a most_popular_product method", () => {
        expect(store.most_popular_product).toBeDefined();
    });
    it("most_popular_product method should return 4 products", async () => {
        const result = await store.most_popular_product();
        expect(result.length).toEqual(4);
    });
});
