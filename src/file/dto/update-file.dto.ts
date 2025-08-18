import { AutoMap } from '@automapper/classes';
import { PostStatus } from 'src/enums/PostStatus.enum';

export class UpdateFileDto {
  @AutoMap()
  id: string;

  @AutoMap()
  userId: String;

  @AutoMap()
  irysId: string;

  @AutoMap()
  signature?: string;

  @AutoMap()
  timestamp: number;

  @AutoMap()
  status?: PostStatus;

  @AutoMap()
  hasedData: string;
}
