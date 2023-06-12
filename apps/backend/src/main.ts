import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationError, useContainer } from 'class-validator';
import { json } from 'express';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { setupSwagger } from './config/swagger-setup';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.use(json({ limit: '5mb' }));

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
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map(
          (error) => `${Object.values(error.constraints).join(', ')}`
        );

        return new BadRequestException(messages);
      },
    })
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  setupSwagger(app);

  await app.listen(port);
}

bootstrap();
