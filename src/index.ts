import 'reflect-metadata';
import { app } from './app';
import serverlessExpress from '@codegenie/serverless-express';

export const handler = serverlessExpress({ app });
