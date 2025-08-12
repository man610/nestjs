"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_session_1.default)({
        secret: 'key',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 5 * 60 * 1000 },
    }));
    app.enableCors('*');
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map