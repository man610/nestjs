import { FileService } from './file.service';
import type { Request } from 'express';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    create(file: Express.Multer.File, req: Request): Promise<{
        id: any;
        timestamp: any;
    }>;
}
