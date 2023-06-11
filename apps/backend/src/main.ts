import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { setupSwagger } from './config/swagger-setup';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.use(json({ limit: '10mb' }));

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transform incoming objects to instance of their corresponding DTO classes
      whitelist: true, // Strip away unwanted properties from the DTO
      forbidNonWhitelisted: true, // Throw an error when unwanted properties are given
      validationError: { target: false }, // Do not expose the incoming object in the error message
    })
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  setupSwagger(app);

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
