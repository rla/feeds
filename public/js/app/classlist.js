// Helper to render a classlist.

module.exports = (classes) => {
    return Object.keys(classes).filter((clazz) => classes[clazz]).join(' ');
};
