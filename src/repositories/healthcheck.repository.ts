import { injectable } from "tsyringe";

@injectable()
export class HealthCheckRepository {
    checkDatabase = async () => {
        return true;
    }
}
