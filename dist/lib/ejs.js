"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
require("ejs");
// Set up EJS templating engine.
exports.default = (app) => {
    app.set('views', path_1.default.join(__dirname, '..', '..', 'views'));
    app.set('view engine', 'ejs');
};
//# sourceMappingURL=ejs.js.map