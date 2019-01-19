// Infinite scroll.
// Not cross-browser.
// Tested in FF 16, Chrome 2x?, Android 4.x.

type ScrollHandler = () => void;

const handlers: ScrollHandler[] = [];

export const addHandler = (cb: ScrollHandler) => {
    handlers.push(cb);
};

export const removeHandler = (cb: ScrollHandler) => {
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
document.addEventListener('scroll', () => {
    const offset = window.pageYOffset;
    const total = document.body.scrollHeight;
    const win = window.innerHeight;
    const toBotton = offset > lastOffset;
    lastOffset = offset;
    const atBottom = offset > (total - win - 100);
    if (toBotton && atBottom && !throttle) {
        throttle = true;
        callHandlers();
        setTimeout(() => {
            throttle = false;
        }, 3000);
    }
}, false);
