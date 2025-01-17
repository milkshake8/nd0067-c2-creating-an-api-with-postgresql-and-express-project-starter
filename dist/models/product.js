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
exports.ProductStore = void 0;
var database_1 = require("../database");
var ProductStore = /** @class */ (function () {
    function ProductStore() {
    }
    ProductStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, results, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM products;";
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
                        throw new Error("Unable to get products. Error: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, results, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM products WHERE id=".concat(id, ";");
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
                        throw new Error("Unable to get book: ".concat(id, ". Error: ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductStore.prototype.create = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, results, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *";
                        return [4 /*yield*/, database_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [p.name, p.price, p.category])];
                    case 2:
                        results = _a.sent();
                        conn.release();
                        return [2 /*return*/, results.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Unable to create product: ".concat(p.name, ". Error: ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductStore.prototype.show_by_category = function (cat) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, results, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM products WHERE category='".concat(cat, "'");
                        return [4 /*yield*/, database_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        results = _a.sent();
                        conn.release();
                        return [2 /*return*/, results.rows];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Unable to show products with category: ".concat(cat, ". Error: ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductStore.prototype.update = function (name, id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, p, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "UPDATE products SET name ='".concat(name, "' WHERE id =").concat(id, ";");
                        return [4 /*yield*/, database_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        p = result.rows;
                        return [2 /*return*/, p];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Unbale to update product: ".concat(id, ". Error: ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductStore.prototype["delete"] = function (product_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, product, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "DELETE FROM products WHERE id=".concat(product_id, ";");
                        return [4 /*yield*/, database_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        product = result.rows[0];
                        conn.release();
                        return [2 /*return*/, product];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Could not delete product ".concat(product_id, ". Error: ").concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ProductStore;
}());
exports.ProductStore = ProductStore;
