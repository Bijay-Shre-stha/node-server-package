module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.js'],
    collectCoverageFrom: [
        'src/controllers/**/*.js',
        'src/routes/**/*.js',
        'src/middlewares/**/*.js',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
};
