// Infinite scroll.
// Not cross-browser.
// Tested in FF 16, Chrome 2x?, Android 4.x.

const handlers = [];

exports.addHandler = (cb) => {
    handlers.push(cb);
};

exports.removeHandler = (cb) => {
    const index = handlers.indexOf(cb);
    if (index >= 0) {
        handlers.splice(index, 1);
    }
};

const callHandlers = () => {
    for (const cb of handlers) {
        cb();
    }
};

let throttle = false;
let lastOffset = 0; // used for detecting direction.
document.addEventListener('scroll', (event) => {
    const offset = window.pageYOffset;
    const total = document.body.scrollHeight;
    const win = window.innerHeight;
    const toBotton = offset > lastOffset;
    lastOffset = offset;
    var atBottom = offset > (total - win - 100);
    if (toBotton && atBottom && !throttle) {
        throttle = true;
        callHandlers();
        setTimeout(function() {
            throttle = false;
        }, 3000);
    }
}, false);
