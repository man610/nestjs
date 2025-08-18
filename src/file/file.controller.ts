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
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { customMulterOptions } from 'src/helpers/multerOptions';
import type { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtDataDto } from 'src/auth/dto/jwt-user-data.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PageDataDto } from 'src/helpers/page.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', customMulterOptions()))
  async create(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const res = await this.fileService.uploadFile(
      file,
      (<JwtDataDto>req['payload']).id,
    );
    return res;
  }

  //will cross check userId
  @Patch()
  async createFile(@Body() createFileDto: UpdateFileDto, @Req() req: Request) {
    // console.log(createFileDto);
    const res = await this.fileService.create(
      createFileDto,
      (<JwtDataDto>req['payload']).id,
    );
    return res;
  }

  @Get('all')
  async getAllFiles(@Req() req: Request, @Query() pageData: PageDataDto) {
    const res = await this.fileService.getAll(
      pageData,
      (<JwtDataDto>req['payload']).id,
    );
    return res;
  }

  @Get(':id')
  async getByID(@Param('id') id: string, @Query() pageData: PageDataDto) {
    const res = await this.fileService.getById(pageData, id);
    return res;
  }
}
