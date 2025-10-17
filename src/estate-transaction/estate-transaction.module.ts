import { EstateTransactionController } from './estate-transaction.controller';
import { EstateTransactionService } from './estate-transaction.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [EstateTransactionController],
  providers: [EstateTransactionService],
})
export class EstateTransactionModule {}
