// tslint:disable: no-empty
const noopTransaction = <T>(all: T[], fn: () => void) => ({
  all: async () => all,
  run: async () => fn(),
});

/**
 * Transaction handler that does nothing.
 * All queries will return the given value.
 * Used for unit testing.
 */
// tslint:disable: no-any
export default <T>(all: T[] = [], fn: (...params: any[]) => void) => noopTransaction(all, fn);
