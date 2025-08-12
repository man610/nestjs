import { UnsupportedMediaTypeException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export function customMulterOptions(
  fileSize: number = 100 * 1024,
): MulterOptions {
  return {
    limits: {
      fileSize: fileSize,
    },
    fileFilter: (req, file, cb) => {
      if (/^image\/(png|jpeg)$/.test(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new UnsupportedMediaTypeException('file must be img'), false);
      }
    },
  };
}
