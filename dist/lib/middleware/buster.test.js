"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buster_1 = __importDefault(require("./buster"));
it('should rewrite the request url', () => {
    const req = {
        url: '/v-1.2.3/public/app.js'
    };
    const next = jest.fn();
    buster_1.default()(req, {}, next);
    expect(req.url).toBe('/public/app.js');
    expect(next).toBeCalled();
});
it('should not rewrite the request url', () => {
    const req = {
        url: '/public/app.js'
    };
    const next = jest.fn();
    buster_1.default()(req, {}, next);
    expect(req.url).toBe('/public/app.js');
    expect(next).toBeCalled();
});
//# sourceMappingURL=buster.test.js.map