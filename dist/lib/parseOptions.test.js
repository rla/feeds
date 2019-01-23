"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseOptions_1 = __importDefault(require("./parseOptions"));
it('should parse empty options', () => {
    const options = parseOptions_1.default([]);
    expect(options.fetch).toBe(false);
    expect(options.configFile).toBe(undefined);
});
it('should parse fetch option', () => {
    const options = parseOptions_1.default(['-f']);
    expect(options.fetch).toBe(true);
    expect(options.configFile).toBe(undefined);
});
it('should parse config option', () => {
    const options = parseOptions_1.default(['-c', 'file.json']);
    expect(options.fetch).toBe(false);
    expect(options.configFile).toBe('file.json');
});
it('should parse invalid config option', () => {
    const options = parseOptions_1.default(['-c']);
    expect(options.fetch).toBe(false);
    expect(options.configFile).toBe(undefined);
});
//# sourceMappingURL=parseOptions.test.js.map