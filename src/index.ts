import 'reflect-metadata';
import { env } from '@env';
import { app } from './app';
import serverlessExpress from '@codegenie/serverless-express';

env.populateAllEnvs();
export const handler = serverlessExpress({ app });
