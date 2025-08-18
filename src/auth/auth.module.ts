import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TwitterStrategy } from './statergies/tweeter.statergy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEnitity } from './entities/auth.entity';
import { UserProfile } from 'src/profiles/user.profile';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([UserEnitity])],
  controllers: [AuthController],
  providers: [AuthService, TwitterStrategy, UserProfile],
})
export class AuthModule {}
