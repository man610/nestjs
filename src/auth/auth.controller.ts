import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { TwitterAuthGuard } from './guards/twitter.guard';
import { AuthService } from './auth.service';
import { TwitterProfileDto } from './dto/twitter-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { JwtDataDto } from './dto/jwt-user-data.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('twitter')
  @UseGuards(TwitterAuthGuard)
  async twitterLogin() {}

  @Get('twitter/callback')
  @UseGuards(TwitterAuthGuard)
  async twitterCallback(@Req() req: Request, @Res() res: Response) {
    // console.log(req.user);
    const token = await this.authService.create(<TwitterProfileDto>req.user);
    console.log(token);
    // return res.redirect(
    //   `http://localhost:5173?token=${token.token}`,
    // );
    return res.redirect(`https://iryswalls.netlify.app?token=${token?.token}`);
    // return res.redirect(`https://iryswalls.netlify.app/${token?.token}`);
  }

  @Get('self')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async self(@Req() req: Request) {
    return this.authService.getUserData((<JwtDataDto>req['payload']).id);
  }

  @Get('profile/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async profile(@Param('id') userId: string) {
    return this.authService.getUserData(userId);
  }
}
