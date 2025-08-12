"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customMulterOptions = customMulterOptions;
const common_1 = require("@nestjs/common");
function customMulterOptions(fileSize = 100 * 1024) {
    return {
        limits: {
            fileSize: fileSize,
        },
        fileFilter: (req, file, cb) => {
            if (/^image\/(png|jpeg)$/.test(file.mimetype)) {
                cb(null, true);
            }
            else {
                cb(new common_1.UnsupportedMediaTypeException('file must be img'), false);
            }
        },
    };
}
//# sourceMappingURL=multerOptions.js.map