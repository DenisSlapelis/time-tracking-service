import { HealthCheckRepository } from '@repositories/healthcheck.repository';
import { showMemory } from '@utils/memory.utils';
import { inject, injectable } from "tsyringe";

@injectable()
export class HealthCheckService {
    constructor(@inject('HealthCheckRepository') private repository: HealthCheckRepository) {
    }

    check = async () => {
        const result = await this.repository.checkDatabase();

        return { status: !!result, message: 'Healthcheck OK.', memory: showMemory() };
    }
}
