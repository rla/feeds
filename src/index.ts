import 'source-map-support/register';
import runMain from './lib/runMain';

// Toplevel wrapper.

(async () => {
  try {
    await runMain(process.argv);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();

// Gracefully terminate on sigterm.

process.on('SIGTERM', () => {
  process.exit(0);
});
