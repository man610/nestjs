import { AutoMap } from '@automapper/classes';
import { UserEnitity } from 'src/auth/entities/auth.entity';
import { PostStatus } from 'src/enums/PostStatus.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileEnitity {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  userId: String;

  @Column({ unique: true })
  @AutoMap()
  irysId: string;

  @Column({ nullable: true })
  @AutoMap()
  signature: string;

  @Column()
  @AutoMap()
  timestamp: Date;

  @Column({ type: 'enum', enum: PostStatus, default: PostStatus.PENDING })
  @AutoMap()
  status: PostStatus;

  @ManyToOne(() => UserEnitity, (user) => user.files)
  @AutoMap(() => UserEnitity)
  user: UserEnitity;
}
