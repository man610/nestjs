import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEnitity } from './entities/file.entity';
import { FileProfile } from 'src/profiles/file.profile';
import { UserProfile } from 'src/profiles/user.profile';

@Module({
  imports: [TypeOrmModule.forFeature([FileEnitity])],
  controllers: [FileController],
  providers: [FileService, FileProfile],
})
export class FileModule {}
