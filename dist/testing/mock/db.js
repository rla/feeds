"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: no-empty
const noopTransaction = (all, fn) => ({
    all: async () => all,
    run: async () => fn(),
});
/**
 * Transaction handler that does nothing.
 * All queries will return the given value.
 * Used for unit testing.
 */
// tslint:disable: no-any
exports.default = (all = [], fn) => noopTransaction(all, fn);
//# sourceMappingURL=db.js.map