import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { CreateFileDto } from 'src/file/dto/create-file.dto';
import { ResFileDto } from 'src/file/dto/res-file.dto';
import { ResUploadFileDto } from 'src/file/dto/res-upload-file.dto';
import { FileEnitity } from 'src/file/entities/file.entity';

@Injectable()
export class FileProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreateFileDto, FileEnitity);
      createMap(mapper, FileEnitity, ResFileDto);
      createMap(
        mapper,
        FileEnitity,
        ResUploadFileDto,
        forMember(
          (d) => d.timestamp,
          mapFrom((s) => s.timestamp.getTime()),
        ),
        forMember(
          (d) => d.irysId,
          mapFrom((s) => {
            return ethers.keccak256(
              ethers.toUtf8Bytes(JSON.stringify(s.irysId)),
            );
          }),
        ),
        forMember(
          (d) => d.hasedData,
          mapFrom((s) => {
            // console.log({
            //   id: s.id,
            //   userId: s.userId,
            //   irysId: s.id,
            //   timestamp: s.timestamp.getTime(),
            // });
            return ethers.keccak256(
              ethers.toUtf8Bytes(
                JSON.stringify({
                  id: s.id,
                  userId: s.userId,
                  irysId: s.irysId,
                  timestamp: s.timestamp.getTime(),
                }),
              ),
            );
          }),
        ),
      );
    };
  }
}
