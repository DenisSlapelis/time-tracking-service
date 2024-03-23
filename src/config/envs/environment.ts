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

  populateAllEnvs() {
    this.envs = {
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
