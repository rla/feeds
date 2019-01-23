"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const runMain_1 = __importDefault(require("./lib/runMain"));
// Toplevel wrapper.
(async () => {
    try {
        await runMain_1.default(process.argv);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
//# sourceMappingURL=index.js.map