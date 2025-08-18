import { AutoMap } from '@automapper/classes';
import { FileEnitity } from 'src/file/entities/file.entity';

export class ResUserDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  userName: string;

  @AutoMap()
  profileImage: string;

  // @AutoMap(() => FileEnitity)
  // files: FileEnitity[];
}
