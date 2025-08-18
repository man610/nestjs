import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TwitterProfileDto } from './dto/twitter-user.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEnitity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtDataDto } from './dto/jwt-user-data.dto';
import { ResUserDto } from './dto/res-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectRepository(UserEnitity)
    private readonly UserRepo: Repository<UserEnitity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(twitterProfileDto: TwitterProfileDto) {
    try {
      const user = this.mapper.map(
        twitterProfileDto,
        TwitterProfileDto,
        UserEnitity,
      );

      let existUserData = await this.UserRepo.findOneBy({ id: user.id });
      if (!existUserData) {
        existUserData = await this.UserRepo.save(user);
      }

      const tokenData = this.mapper.map(existUserData, UserEnitity, JwtDataDto);
      const userData = this.mapper.map(existUserData, UserEnitity, ResUserDto);
      const token = await this.jwtService.signAsync({ ...tokenData });

      return { token, userData };
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        'Failed to create or retrieve user',
      );
    }
  }

  async getUserData(userId: string) {
    const user = await this.UserRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');
    return this.mapper.map(user, UserEnitity, ResUserDto);
  }

  async getUserDataWithFile(userId: string) {
    const user = await this.UserRepo.findOne({
      where: {
        id: userId,
        //   files: {
        //     status: PostStatus.VERIFIED,
        //   },
      },
      // relations: ['files'],
    });

    if (!user) {
      // user = await this.UserRepo.findOneBy({ id: userId });
      throw new NotFoundException('User not found');
    }

    return this.mapper.map(user, UserEnitity, ResUserDto);
  }
}
