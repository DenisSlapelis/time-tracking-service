import { env } from '@env';
import { injectable } from "tsyringe";

@injectable()
export class ConfigService {
    reload = async () => {
        await env.populateAllEnvs();

        return { message: 'Envs have been updated' };
    }
}
