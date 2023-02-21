"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.OrderProductStore = void 0;
var database_1 = require("../database");
var OrderProductStore = /** @class */ (function () {
    function OrderProductStore() {
    }
    OrderProductStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, results, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM order_products;";
                        return [4 /*yield*/, database_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        results = _a.sent();
                        conn.release();
                        return [2 /*return*/, results.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Unable to get order_products. Error: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderProductStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, results, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM order_products WHERE id=".concat(id, ";");
                        return [4 /*yield*/, database_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        results = _a.sent();
                        conn.release();
                        return [2 /*return*/, results.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Unable to get order_products: ".concat(id, ". Error: ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderProductStore.prototype.create = function (op) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, sql_product, sql_order, conn, result_product, product, result_order, order, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        sql = "INSERT INTO order_products(quantity, order_id, product_id) VALUES(".concat(op.quantity, ", ").concat(op.order_id, ", ").concat(op.product_id, ") RETURNING*");
                        sql_product = "SELECT * FROM products WHERE id=".concat(op.product_id, ";");
                        sql_order = "SELECT * FROM products WHERE id=".concat(op.order_id, ";");
                        return [4 /*yield*/, database_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql_product)];
                    case 2:
                        result_product = _a.sent();
                        product = result_product.rows[0];
                        return [4 /*yield*/, conn.query(sql_order)];
                    case 3:
                        result_order = _a.sent();
                        order = result_order.rows[0];
                        if (!(product && order)) return [3 /*break*/, 5];
                        return [4 /*yield*/, conn.query(sql)];
                    case 4:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 5:
                        conn.release();
                        return [2 /*return*/, null];
                    case 6:
                        err_3 = _a.sent();
                        throw new Error("Could not add product: ".concat(op.product_id, " to order: ").concat(op.order_id, ". Error: ").concat(err_3));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    OrderProductStore.prototype.update = function (op) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, sql_product, sql_order, conn, result_product, product, result_order, order, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        sql = "UPDATE order_products SET order_id=".concat(op.order_id, ", product_id=").concat(op.product_id, ", quantity=").concat(op.quantity, " WHERE id=").concat(op.id);
                        sql_product = "SELECT * FROM products WHERE id=".concat(op.product_id, ";");
                        sql_order = "SELECT * FROM products WHERE id=".concat(op.order_id, ";");
                        return [4 /*yield*/, database_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql_product)];
                    case 2:
                        result_product = _a.sent();
                        product = result_product.rows[0];
                        return [4 /*yield*/, conn.query(sql_order)];
                    case 3:
                        result_order = _a.sent();
                        order = result_order.rows[0];
                        if (!(product && order)) return [3 /*break*/, 5];
                        return [4 /*yield*/, conn.query(sql)];
                    case 4:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 5:
                        conn.release();
                        return [2 /*return*/, null];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_4 = _a.sent();
                        throw new Error("Unable to update order_products ".concat(op.id, ". Error: ").concat(err_4));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    OrderProductStore.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, order_product, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "DELETE FROM order_products WHERE id=($1)";
                        return [4 /*yield*/, database_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        order_product = result.rows[0];
                        conn.release();
                        return [2 /*return*/, order_product];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Could not delete order_products ".concat(id, ". Error: ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderProductStore;
}());
exports.OrderProductStore = OrderProductStore;
