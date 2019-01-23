module.exports = {
    roots: ['./testing'],
    transform: {'^.+\\.tsx?$': 'ts-jest'},
    testRegex: '\\.test\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
        'ts-jest': {
            tsConfig: './src/tsconfig.json'
        }
    }
};
