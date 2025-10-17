import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstateTransactionModule } from './estate-transaction/estate-transaction.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [EstateTransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
