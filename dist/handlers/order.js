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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var order_1 = require("../models/order");
var tkverifier_1 = __importDefault(require("../middlewares/tkverifier"));
var store = new order_1.OrderStore();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = _req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.show(id)];
            case 2:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, new_order, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order = {
                    user_id: parseInt(_req.body.user_id),
                    status: _req.body.status
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.create(order)];
            case 2:
                new_order = _a.sent();
                if (new_order != null) {
                    res.json(new_order);
                }
                else {
                    res.send("Unable to find user with id: ".concat(order.user_id));
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(400);
                res.json(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var update = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order, result, updated_order, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                id = parseInt(_req.params.id);
                order = {
                    id: id,
                    user_id: _req.body.user_id,
                    status: _req.body.status
                };
                return [4 /*yield*/, store.update(order)];
            case 1:
                result = _a.sent();
                if (!(result !== null)) return [3 /*break*/, 3];
                return [4 /*yield*/, store.show(_req.params.id)];
            case 2:
                updated_order = _a.sent();
                res.json(updated_order);
                return [3 /*break*/, 4];
            case 3:
                res.send("Unable to find user with the id: ".concat(order.user_id));
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                res.status(400);
                res.send("Error: ".concat(err_4));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var delete_order = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, orders, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = _req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, store["delete"](id)];
            case 2:
                _a.sent();
                return [4 /*yield*/, store.index()];
            case 3:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 5];
            case 4:
                err_5 = _a.sent();
                res.status(400);
                res.json(err_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var current_order = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, curr_order, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = _req.params.user_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.current_order(user_id)];
            case 2:
                curr_order = _a.sent();
                res.json(curr_order);
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                res.status(400);
                res.json(err_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var complete_orders = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, comp_orders, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = _req.params.user_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.complete_orders(user_id)];
            case 2:
                comp_orders = _a.sent();
                res.json(comp_orders);
                return [3 /*break*/, 4];
            case 3:
                err_7 = _a.sent();
                res.status(400);
                res.json(err_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var order_routes = function (app) {
    app.get("/orders", tkverifier_1["default"], index);
    app.get("/orders/:id", tkverifier_1["default"], show);
    app.post("/orders", tkverifier_1["default"], create);
    app.put("/orders/:id", tkverifier_1["default"], update);
    app["delete"]("/orders/:id", tkverifier_1["default"], delete_order);
    app.get("/current_orders/:user_id", tkverifier_1["default"], current_order);
    app.get("/complete_orders/:user_id", tkverifier_1["default"], complete_orders);
};
exports["default"] = order_routes;
