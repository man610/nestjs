export declare class FileService {
    private irysUploader;
    private getUploader;
    uploadFile(file: Express.Multer.File): Promise<{
        id: any;
        timestamp: any;
    }>;
}
