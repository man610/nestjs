import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { config as DotenvConfing } from 'dotenv';
import { JwtDataDto } from '../dto/jwt-user-data.dto';
DotenvConfing({ path: '.env' });
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = context.switchToHttp();
      const req = ctx.getRequest<Request>();
      const authHeader = req.headers.authorization;
      // console.log(authHeader);
      if (!authHeader) {
        // return false;
        throw new HttpException('Unauthorized: Missing token', 401);
      }
      // console.log(authHeader);
      const token = authHeader.substring(7, authHeader.length);
      const payload: JwtDataDto = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      req['payload'] = payload;
      return true;
    } catch (err) {
      // return false;
      throw new HttpException('Unauthorized: Missing token', 401);
    }
  }
}
