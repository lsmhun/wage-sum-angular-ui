import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['./setup-jest.ts'], 
  globalSetup: 'jest-preset-angular/global-setup',
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
    },
  },
  moduleNameMapper: {
    // in case of aliases in tsconfig.json (pl. "@app/*": ["src/app/*"])
    // "^@app/(.*)$": "./src/app/$1",
    // "^@core/(.*)$": "./src/app/core/$1",
  },
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  coverageDirectory: 'coverage', 
  // collectCoverageFrom: ['**/*.{ts,js}', '!**/node_modules/**'],
};

export default config;