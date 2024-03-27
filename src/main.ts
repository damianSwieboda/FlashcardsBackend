import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');
// import { GlobalExceptionFilter } from './http.exception-filter';

import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  app.use(
    cookieSession({
      // keys: [''],
      secret: process.env.SESSION_SECRET,
      saveUninitialized: true,
      resave: false,
    })
  );
  app.enableCors({ credentials: true, origin: true });
  // app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(3000);
}
bootstrap();
