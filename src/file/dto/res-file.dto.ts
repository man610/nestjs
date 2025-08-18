import { AutoMap } from '@automapper/classes';
import { ResUserDto } from 'src/auth/dto/res-user.dto';

export class ResFileDto {
  @AutoMap()
  id: string;

  @AutoMap()
  userId: String;

  @AutoMap()
  irysId: string;

  @AutoMap()
  signature: string;

  @AutoMap()
  timestamp: Date;

  @AutoMap(() => ResUserDto)
  user: ResUserDto;
}
