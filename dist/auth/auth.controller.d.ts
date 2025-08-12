import type { Request } from 'express';
export declare class AuthController {
    twitterLogin(): Promise<void>;
    twitterCallback(req: Request): Promise<{
        message: string;
        user: Express.User | undefined;
    }>;
}
