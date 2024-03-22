import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
    preset: "ts-jest",
    testMatch: ["**/tests/**/*.test.ts"],
    testEnvironment: "node",
    moduleNameMapper: {
        '^@env$': '<rootDir>/src/utils/dependency.utils',
        '^@dependency$': '<rootDir>/src/utils/dependency.utils',
        '^@logger$': '<rootDir>/src/utils/logger/index',
        '^@database$': '<rootDir>/src/utils/dependency.utils',
        '^@middlewares$': ["<rootDir>/src/middlewares"],
        '^@utils$': ["<rootDir>/src/utils"],
        '^@controllers/(.*)$': ["<rootDir>/src/controllers/$1"],
        '^@dtos/(.*)$': ["<rootDir>/src/dtos/$1"],
        '^@middlewares/(.*)$': ["<rootDir>/src/middlewares/$1"],
        '^@entities/(.*)$': ["<rootDir>src/entities/$1"],
        '^@routes/(.*)$': ["<rootDir>/src/routes/$1"],
        '^@services/(.*)$': ["<rootDir>/src/services/$1"],
        '^@repositories/(.*)$': ["<rootDir>/src/repositories/$1"],
        '^@utils/(.*)$': ["<rootDir>/src/utils/$1"],
        '^@interfaces/(.*)$': ["<rootDir>/src/interfaces/$1"],
        '^@useCases/(.*)$': ["<rootDir>/src/use-cases/$1"],
    },
    collectCoverageFrom: [
        '<rootDir>/src/repositories/**/*.ts',
        '<rootDir>/src/use-cases/**/*.ts',
    ],
}

export default jestConfig
