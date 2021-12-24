export default {
  collectCoverage: true,
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts'],
  coveragePathIgnorePatterns: ['/src/React', '/src/Vue'],
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    '@/test/(.*)': '<rootDir>/test/$1',
    '@bee/track-(.*)': '<rootDir>/packages/$1/src/index',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      diagnostics: false,
    },
  },
};
