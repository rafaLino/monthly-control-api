/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  setupFiles: ["<rootDir>/jest/setEnv.js"],
  coverageProvider: "v8",
  transform: {
    '^.+\\.(js|mjs)$': 'babel-jest',
  },
};

module.exports = config;
