const { defaults } = require('jest-config');
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!node_modules/**', '!**/vendor/**'],
  testMatch: ['<rootDir>/src/**/+(*.)+(spec|test).(ts|tsx)'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
