module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['jest-extended'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', // Transform TypeScript files using babel-jest
    '^.+\\.(js|jsx)$': 'babel-jest', // Transform JavaScript files using babel-jest
  },
  testEnvironment: 'node',  // Set the test environment (use 'jsdom' for React)
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  transformIgnorePatterns: [
    '/node_modules/(?!react-native|@react-native|react-navigation|@react-navigation)/', // Do not ignore certain modules
  ],
};
