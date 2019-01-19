/**
 * Helper to render a classlist.
 */
export default (classes: { [key: string]: boolean }) => {
    return Object.keys(classes).filter((clazz) => classes[clazz]).join(' ');
};
