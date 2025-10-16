import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const url = await app.getUrl();
  Logger.log('=================================================');
  Logger.log(`Application is running on: ${url}`);
  Logger.log('=================================================');
}
bootstrap();
