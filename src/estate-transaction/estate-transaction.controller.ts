import { EstateTransactionService } from './estate-transaction.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('api/v1/townPlanning/estateTransaction')
export class EstateTransactionController {
  constructor(private readonly estateTransactionService: EstateTransactionService) {}

  @Get('bar')
  getEstateData(
    @Query('year') year?: string,
    @Query('prefCode') prefCode?: string,
    @Query('type') type?: string,
  ) {
    const yearNumber = year ? Number(year) : undefined;
    const prefCodeNumber = prefCode ? Number(prefCode) : undefined;
    const typeNumber = type ? Number(type) : undefined;

    return this.estateTransactionService.searchData(yearNumber, prefCodeNumber, typeNumber);
  }
}
