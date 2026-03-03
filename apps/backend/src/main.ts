import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === "production";
  const app = await NestFactory.create(AppModule, {
    logger: isProduction
      ? ["error", "warn"]
      : ["log", "debug", "error", "warn", "verbose"],
  });

  // 🔒 Security: Helmet (HTTP Headers)
  app.use(helmet());

  // Professional API prefix
  app.setGlobalPrefix("api/v1");

  // 🛡️ Validation guard (DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: isProduction, // Ocultar mensajes detallados en producción
    }),
  );

  // 🔒 Security: Restricted CORS
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:3000", "http://localhost:5173"]; // Defaults para dev

  app.enableCors({
    origin: isProduction ? allowedOrigins : true, // En dev permite todo, en prod restringe
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
