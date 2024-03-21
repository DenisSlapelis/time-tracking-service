import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { env } from '@env';

@injectable()
export class LoginController {
    login = async (req: Request, res: Response) => {
        try {
            const token = this.signToken(1);

            return res.status(200).json({ token });
        } catch (error: any) {
            return res.status(500).json({ message: error?.message ?? error });
        }
    }

    private signToken = (userId) => {
        const payload = {
            sysUserId: userId
        }

        const options = {
            expiresIn: '24h',
        };

        return jwt.sign(payload, env.getValue('JWT_PRIVATE_KEY'), options);
    }
}
