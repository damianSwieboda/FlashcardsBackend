import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  app.use(
    cookieSession({
      keys: ['asdsa'],
      secret: '1234',
      saveUninitialized: true,
      resave: false,
    })
  );
  app.enableCors({ credentials: true, origin: true });
  await app.listen(3000);
}
bootstrap();
