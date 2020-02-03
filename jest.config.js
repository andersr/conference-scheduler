module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text-summary"],
  collectCoverageFrom: ["**/*.ts", "!**/node_modules/**"],
  moduleFileExtensions: ["js", "ts"],
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};
