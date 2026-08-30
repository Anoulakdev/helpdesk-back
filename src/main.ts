/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', true);
  app.setGlobalPrefix('api');
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );

  const allowedOrigins = [
    'http://localhost:3500',
    'http://192.168.20.16:3500',
    'https://helpdesk.edl.com.la',
  ];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // ✅ STATIC FILES (รองรับ Windows / Linux)
  const uploadBasePath = process.env.UPLOAD_BASE_PATH;
  if (!uploadBasePath) {
    throw new Error('UPLOAD_BASE_PATH is not defined');
  }

  app.use('/upload', express.static(path.resolve(uploadBasePath)));
  await app.listen(4000);
}
bootstrap();
