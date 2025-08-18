import { AutoMap } from '@automapper/classes';

export class ResUploadFileDto {
  @AutoMap()
  id: string;

  @AutoMap()
  userId: String;

  @AutoMap()
  irysId: string;

  @AutoMap()
  timestamp: number;

  @AutoMap()
  hasedData: string;
}
