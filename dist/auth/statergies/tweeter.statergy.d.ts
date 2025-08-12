import { Strategy } from '@superfaceai/passport-twitter-oauth2';
import { Request } from 'express';
declare const TwitterStrategy_base: new (...args: [userOptions: import("@superfaceai/passport-twitter-oauth2").StrategyOptionsWithRequest] | [userOptions: import("@superfaceai/passport-twitter-oauth2").StrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class TwitterStrategy extends TwitterStrategy_base {
    constructor();
    validate(req: Request, accessToken: string, refreshToken: string, profile: any, done: Function): Promise<void>;
}
export {};
