import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Uploader } from '@irys/upload';
import { Ethereum } from '@irys/upload-ethereum';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEnitity } from './entities/file.entity';
import { Not, Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UpdateFileDto } from './dto/update-file.dto';
import { PostStatus } from 'src/enums/PostStatus.enum';
import { ResUploadFileDto } from './dto/res-upload-file.dto';
import { ethers } from 'ethers';
import { PageDataDto } from 'src/helpers/page.dto';
import { ResFileDto } from './dto/res-file.dto';

dotenv.config();

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEnitity)
    private readonly FileRepo: Repository<FileEnitity>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}
  private irysUploader: any;

  private async getUploader() {
    if (!this.irysUploader) {
      this.irysUploader = await Uploader(Ethereum).withWallet(
        process.env.PRIVATE_KEY,
      );
    }
    return this.irysUploader;
  }

  async uploadFile(file: Express.Multer.File, userId: string) {
    try {
      const uploader = await this.getUploader();
      const result = await uploader.upload(file.buffer, {
        tags: [
          { name: 'Content-Type', value: file.mimetype },
          { name: 'fileName', value: file.originalname },
        ],
      });

      const data = new FileEnitity();
      data.irysId = result.id;
      data.timestamp = new Date(result.timestamp);
      data.userId = userId;
      const insertedData = await this.FileRepo.save(data);

      return this.mapper.map(insertedData, FileEnitity, ResUploadFileDto);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('File upload failed');
    }
  }

  async create(createFileDto: UpdateFileDto, userId: string) {
    try {
      const file = await this.FileRepo.findOneBy({
        id: createFileDto.id,
        userId: userId,
      });
      if (!file) throw new NotFoundException('File not found');
      // if(createFileDto.status==PostStatus.REJECTED){}
      const payload = {
        id: file.id,
        userId: file.userId,
        irysId: file.irysId,
        timestamp: createFileDto.timestamp,
      };

      const hashedData = ethers.keccak256(
        ethers.toUtf8Bytes(JSON.stringify(payload)),
      );
      if (createFileDto.signature) file.signature = createFileDto.signature;
      if (
        createFileDto.hasedData !== hashedData ||
        !createFileDto.signature ||
        createFileDto.status == PostStatus.REJECTED
      ) {
        file.status = PostStatus.REJECTED;
      } else {
        file.status = PostStatus.VERIFIED;
      }

      const data = await this.FileRepo.save(file);
      return this.mapper.map(data, FileEnitity, ResFileDto);
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundException) throw err;
      throw new BadRequestException('Failed to verify file');
    }
  }

  async getAll(pageData: PageDataDto, userId: string) {
    try {
      const returnPageData = {};
      const { page, dataPerPage: dataCount } = pageData;
      const [files, count] = await this.FileRepo.findAndCount({
        where: {
          userId: Not(userId),
          status: PostStatus.VERIFIED,
        },
        relations: ['user'],
        skip: (page - 1) * dataCount,
        take: dataCount,
      });
      // console.log(files);
      returnPageData['currentpage'] = page;
      returnPageData['PerPageData'] = dataCount;
      returnPageData['totalPage'] = Math.ceil(count / dataCount);
      returnPageData['files'] = this.mapper.mapArray(
        files,
        FileEnitity,
        ResFileDto,
      );
      // console.log(this.mapper.mapArray(files, FileEnitity, ResFileDto));
      return returnPageData;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async getById(pageData: PageDataDto, userId: string) {
    try {
      const returnPageData = {};
      const { page, dataPerPage: dataCount } = pageData;
      const [files, count] = await this.FileRepo.findAndCount({
        where: {
          userId: userId,
          status: PostStatus.VERIFIED,
        },
        relations: ['user'],
        skip: (page - 1) * dataCount,
        take: dataCount,
      });
      // console.log(files);
      returnPageData['currentpage'] = page;
      returnPageData['PerPageData'] = dataCount;
      returnPageData['totalPage'] = Math.ceil(count / dataCount);
      returnPageData['files'] = this.mapper.mapArray(
        files,
        FileEnitity,
        ResFileDto,
      );
      // console.log(this.mapper.mapArray(files, FileEnitity, ResFileDto));
      return returnPageData;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
