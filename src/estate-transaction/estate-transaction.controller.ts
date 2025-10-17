import { EstateTransactionService } from './estate-transaction.service';
import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/townPlanning/estateTransaction')
export class EstateTransactionController {
  constructor(private readonly estateTransactionService: EstateTransactionService) {}

  @Get('bar')
  getAllEstateData() {
    return this.estateTransactionService.getAllData();
  }
}
