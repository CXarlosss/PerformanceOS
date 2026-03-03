"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
async function bootstrap() {
    const isProduction = process.env.NODE_ENV === "production";
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: isProduction
            ? ["error", "warn"]
            : ["log", "debug", "error", "warn", "verbose"],
    });
    app.use((0, helmet_1.default)());
    app.setGlobalPrefix("api/v1");
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        disableErrorMessages: isProduction,
    }));
    const allowedOrigins = process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",")
        : ["http://localhost:3000", "http://localhost:5173"];
    app.enableCors({
        origin: isProduction ? allowedOrigins : true,
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`PerformanceOS API Running on: http://localhost:${port}/api/v1`);
    if (!isProduction) {
        console.log(`CORS Allowed Origins: ${allowedOrigins.join(", ")}`);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map