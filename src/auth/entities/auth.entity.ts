import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { FileEnitity } from 'src/file/entities/file.entity';
@Entity()
export class UserEnitity {
  @PrimaryColumn()
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  name: string;

  //no problem until we just don't give right to user to update it other flow is ask user Name first set it to null or some unquie like auto genrated
  @Column({ unique: true })
  @AutoMap()
  userName: string;

  @Column()
  @AutoMap()
  profileImage: string;

  @CreateDateColumn()
  @AutoMap()
  createdAt: Date;

  @OneToMany(()=>FileEnitity,(file)=>file.user)
  files:FileEnitity[]
}
