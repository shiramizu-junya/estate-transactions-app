import { AppModule } from './app.module';
import { validationConfig } from './config/validation.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationConfig));
  await app.listen(process.env.PORT ?? 3000);

  const url = await app.getUrl();
  Logger.log('=================================================');
  Logger.log(`Application is running on: ${url}`);
  Logger.log('=================================================');
}
bootstrap();
