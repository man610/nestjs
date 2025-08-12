import { Injectable } from '@nestjs/common';
import { Uploader } from '@irys/upload';
import { Ethereum } from '@irys/upload-ethereum';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class FileService {
  private irysUploader: any;

  private async getUploader() {
    if (!this.irysUploader) {
      this.irysUploader = await Uploader(Ethereum).withWallet(
        process.env.PRIVATE_KEY,
      );
    }
    return this.irysUploader;
  }

  async uploadFile(file: Express.Multer.File) {
    const uploader = await this.getUploader();

    const result = await uploader.upload(file.buffer, {
      tags: [
        { name: 'Content-Type', value: file.mimetype },
        { name: 'fileName', value: file.originalname },
      ],
    });

    return { id: result.id, timestamp: result.timestamp };
  }
}
