"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var product_1 = __importDefault(require("./handlers/product"));
var user_1 = __importDefault(require("./handlers/user"));
var order_1 = __importDefault(require("./handlers/order"));
var order_product_1 = __importDefault(require("./handlers/order_product"));
var dashboard_handler_1 = __importDefault(require("./Services/dashboard_handler"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
var corsOptions = {
    origin: "http://someotherdomain.com",
    optionsSuccessStatus: 200
};
app.use(body_parser_1["default"].json());
app.use((0, cors_1["default"])(corsOptions));
app.get("/", function (req, res) {
    res.send("<h1>Welcome to the storefront API</h1><p>Go to the Readme.md file to see the routes</p>");
});
(0, product_1["default"])(app);
(0, user_1["default"])(app);
(0, order_1["default"])(app);
(0, order_product_1["default"])(app);
(0, dashboard_handler_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
