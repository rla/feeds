module.exports = {
    roots: [
        './public/js/app'
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '\\.test\\.tsx?$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ],
    globals: {
        'ts-jest': {
            tsConfig: './public/js/app/tsconfig.json'
        }
    },
    snapshotSerializers: ['enzyme-to-json/serializer'],
    setupTestFrameworkScriptFile: './public/js/app/testing/setupTests.ts'
};
