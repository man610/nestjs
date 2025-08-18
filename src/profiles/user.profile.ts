import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { JwtDataDto } from 'src/auth/dto/jwt-user-data.dto';
import { ResUserDto } from 'src/auth/dto/res-user.dto';
import { TwitterProfileDto } from 'src/auth/dto/twitter-user.dto';
import { UserEnitity } from 'src/auth/entities/auth.entity';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        TwitterProfileDto,
        UserEnitity,
        forMember(
          (d) => d.userName,
          mapFrom((s) => s.username),
        ),
        forMember(
          (d) => d.profileImage,
          mapFrom((s) => s.profile_image_url),
        ),
      );
      createMap(mapper, UserEnitity, JwtDataDto);
      createMap(mapper, UserEnitity, ResUserDto);
    };
  }
}
