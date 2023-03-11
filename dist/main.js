"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const app_config_1 = require("./config/app.config");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const express_session_1 = __importDefault(require("express-session"));
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    const configService = app.get(config_1.ConfigService);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Chatapp API')
        .setDescription('반갑습니다. Chatapp 개발을 위한 API 문서입니다. Made By 김민우')
        .setVersion('1.0')
        .addCookieAuth('connect.sid')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    app.use((0, express_session_1.default)({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
    }));
    const port = configService.get(app_config_1.SERVER_PORT);
    await app.listen(port, () => common_1.Logger.log(`🚀Running on port ${port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map