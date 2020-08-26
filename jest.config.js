require('dotenv').config({
  path: '.env.test'
});

module.exports = {
  testEnvironment: 'node',
  roots: ['packages/', 'examples/'],
  testMatch: ['**/__tests__/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      packageJson: 'package.json'
    }
  }
};
