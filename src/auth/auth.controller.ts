import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { TwitterAuthGuard } from './guards/twitter.guard';

@Controller('auth')
export class AuthController {
  @Get('twitter')
  @UseGuards(TwitterAuthGuard)
  async twitterLogin() {}

  @Get('twitter/callback')
  @UseGuards(TwitterAuthGuard)
  async twitterCallback(@Req() req: Request) {
    return {
      message: 'Login successful',
      user: req.user,
    };
  }
}
