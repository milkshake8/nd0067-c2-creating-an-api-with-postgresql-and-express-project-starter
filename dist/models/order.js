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
exports.OrderStore = void 0;
var database_1 = require("../database");
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    OrderStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, results, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM orders;";
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
                        throw new Error("Unable to get orders. Error: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, results, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM orders WHERE id=".concat(id, ";");
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
                        throw new Error("Unable to get order: ".concat(id, ". Error: ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.create = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var sql_user, conn, result_user, user, sql, results, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        sql_user = "SELECT * FROM users WHERE id=".concat(o.user_id, ";");
                        return [4 /*yield*/, database_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql_user)];
                    case 2:
                        result_user = _a.sent();
                        user = result_user.rows[0];
                        if (!user) return [3 /*break*/, 4];
                        sql = "INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [o.user_id, o.status])];
                    case 3:
                        results = _a.sent();
                        conn.release();
                        return [2 /*return*/, results.rows[0]];
                    case 4:
                        conn.release();
                        return [2 /*return*/, null];
                    case 5:
                        err_3 = _a.sent();
                        throw new Error("Unable to create order for the user: ".concat(o.user_id, ". Error: ").concat(err_3));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.update = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var sql_user, conn, result_user, user, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        sql_user = "SELECT * FROM users WHERE id=".concat(o.user_id, ";");
                        return [4 /*yield*/, database_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql_user)];
                    case 2:
                        result_user = _a.sent();
                        user = result_user.rows[0];
                        if (!user) return [3 /*break*/, 4];
                        sql = "UPDATE orders SET user_id=".concat(o.user_id, ", status='").concat(o.status, "' WHERE id=").concat(o.id, ";");
                        return [4 /*yield*/, conn.query(sql)];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        conn.release();
                        return [2 /*return*/, null];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_4 = _a.sent();
                        throw new Error("Unable to update order ".concat(o.id, ". Error: ").concat(err_4));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, order, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "DELETE FROM orders WHERE id=($1)";
                        return [4 /*yield*/, database_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        conn.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Could not delete ordder ".concat(id, ". Error: ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.current_order = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, results, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT o.id, op.product_id, op.quantity, o.user_id, o.status FROM orders o JOIN order_products op ON o.id=op.order_id WHERE o.user_id=".concat(user_id, " AND o.status='active';");
                        return [4 /*yield*/, database_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        results = _a.sent();
                        conn.release();
                        return [2 /*return*/, results.rows[0]];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Unable to get current order of the user:".concat(user_id, ". Error: ").concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.complete_orders = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, results, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT o.id, op.product_id, op.quantity, o.user_id, o.status FROM orders o JOIN order_products op ON o.id=op.order_id WHERE o.user_id=".concat(user_id, " AND o.status='complete';");
                        return [4 /*yield*/, database_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        results = _a.sent();
                        conn.release();
                        return [2 /*return*/, results.rows];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("Unable to get completed orders of user: ".concat(user_id, ". Error: ").concat(err_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
