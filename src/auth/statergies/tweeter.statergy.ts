import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from '@superfaceai/passport-twitter-oauth2';
import { Request } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    super({
      clientID: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      callbackURL: process.env.TWITTER_CALLBACK_URL!,
      scope: ['tweet.read', 'users.read', 'offline.access'],
      passReqToCallback: true,
      clientType: 'confidential'
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    try {
      console.log(profile);
      const response = await axios.get('https://api.twitter.com/2/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      done(null, response.data.data);
    } catch (error) {
      done(error, false);
    }
  }
}
