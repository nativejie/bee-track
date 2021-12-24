/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  collectCoverage: false,
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      diagnostics: false,
    },
  },
  moduleNameMapper: {
    '@/test/(.*)': '<rootDir>/test/$1',
    '@bee/track-(.*)': '<rootDir>/packages/$1/src/index',
  },
  // https://jestjs.io/zh-Hans/docs/puppeteer
  globalSetup: './test/config/setup.js',
  globalTeardown: './test/config/teardown.js',
  testEnvironment: './test/config/puppeteerEnvironment.js',
};
