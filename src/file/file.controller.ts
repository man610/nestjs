import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { customMulterOptions } from 'src/helpers/multerOptions';
import type { Request } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', customMulterOptions()))
  async create(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    // console.log(file);
    const res = await this.fileService.uploadFile(file);
    console.log(res);
    return res
  }
}
