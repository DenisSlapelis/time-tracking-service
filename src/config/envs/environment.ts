import { singleton } from 'tsyringe';
import { localEnvs } from './local-envs';
// import { asyncEnvs } from '@dependency';

@singleton()
export class Environment {
  public static readonly instance: Environment;
  envs: {};

  constructor() {
    this.envs = {};
  }

  async populateAllEnvs() {
    const isTestEnvironment = this.getValue('APPLICATION_ENVIRONMENT') == 'test';

    const asyncEnvsResult = isTestEnvironment ? { JWT_PRIVATE_KEY: 'test_jwt'} : {} //await asyncEnvs.getValues();

    this.envs = {
      ...asyncEnvsResult,
      ...localEnvs
    }
  }

  getAll() {
    return this.envs;
  }

  getValue(value: string) {
    const environmentValue = this.envs[value];

    if (process.env.DEBUG == 'true')
      return process.env[value] ?? environmentValue;

    return environmentValue;
  }
}
