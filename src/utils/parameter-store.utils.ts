import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';
import { singleton } from 'tsyringe';
import { env } from '@env';
import * as logger from '@logger';

@singleton()
export class ParameterStore {
    private ssmClient: SSMClient;

    constructor() {
        this.ssmClient = this.init()
    }

    private init = () => {
        const accessKeyId = env.getValue('AWS_ACCESS_KEY_ID')
        const secretAccessKey = env.getValue('AWS_SECRET_ACCESS_KEY')
        const regionKey = env.getValue('AWS_REGION')

        return new SSMClient({
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
            region: regionKey,
        });
    }

    private formatValuesByEnvironment(values: Array<string>) {
        const environment = env.getValue('APPLICATION_ENVIRONMENT').toLocaleLowerCase();

        return values.map((value) => `/${environment}/${value}`);
    }

    private formatKeys(name: string) {
        return name.split('/').slice(-1).join('').toUpperCase();
    }

    async getParametersFromStore(params: Array<string>) {
        const command = new GetParametersCommand({
            Names: this.formatValuesByEnvironment(params),
            WithDecryption: true,
        });

        const response = await this.ssmClient.send(command).catch(err => {
            logger.error(`Error getting data from parameter store: ${JSON.stringify(err)}`);
            throw err;
        })

        const parameters = response.Parameters;

        if (!parameters?.length) return {};

        const result = {};

        for (const parameter of parameters) {
            if (parameter.Name)
                result[this.formatKeys(parameter.Name)] = parameter.Value;
        }

        return result;
    }
}
