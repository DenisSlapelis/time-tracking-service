import dotenv from 'dotenv';

dotenv.config({ path: `${process.env.ENV_FILE_PATH ?? '.env'}` });

const getEnvironmentVariable = (environmentVariableName: string) => {
    const environmentVariable = process.env[environmentVariableName];

    if (!environmentVariable) return '';

    return environmentVariable;
};

export const localEnvs = {
    // AWS ENVS
    AWS_ACCESS_KEY_ID: getEnvironmentVariable('AWS_ACCESS_KEY_ID'),
    AWS_REGION: getEnvironmentVariable('AWS_REGION'),
    AWS_SECRET_ACCESS_KEY: getEnvironmentVariable('AWS_SECRET_ACCESS_KEY'),

    // APPLICATION ENVS
    APPLICATION_ENVIRONMENT: getEnvironmentVariable('APPLICATION_ENVIRONMENT') ?? 'dev',
    APPLICATION_NAME: getEnvironmentVariable('APPLICATION_NAME') ?? 'rural-producer-service',
    DEBUG: getEnvironmentVariable('DEBUG') ?? 'false',
    NODE_ENV: getEnvironmentVariable('NODE_ENV') ?? 'development',
    PORT: Number(getEnvironmentVariable('PORT') ?? 8000),
    CORS_ORIGIN: getEnvironmentVariable('CORS_ORIGIN'),
    JWT_PRIVATE_KEY: getEnvironmentVariable('JWT_PRIVATE_KEY'),
};
