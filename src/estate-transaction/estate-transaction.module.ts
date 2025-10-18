import { EstateTransactionController } from './estate-transaction.controller';
import { EstateTransactionService } from './estate-transaction.service';
import { EstateTransactionRepository } from './repositories/estate-transaction.repository';
import { Module } from '@nestjs/common';

@Module({
  controllers: [EstateTransactionController],
  providers: [EstateTransactionService, EstateTransactionRepository],
})
export class EstateTransactionModule {}
