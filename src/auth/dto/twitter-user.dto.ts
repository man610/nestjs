import { AutoMap } from '@automapper/classes';

export class TwitterProfileDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  username: string;

  @AutoMap()
  profile_image_url: string;
}
