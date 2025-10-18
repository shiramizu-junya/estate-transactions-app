import { SearchEstateDto } from './dto/search-estate.dto';
import { EstateTransactionService } from './estate-transaction.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('api/v1/townPlanning/estateTransaction')
export class EstateTransactionController {
  constructor(private readonly estateTransactionService: EstateTransactionService) {}

  @Get('bar')
  getEstateData(@Query() query: SearchEstateDto) {
    const { year, prefCode, type } = query;

    return this.estateTransactionService.searchData(year, prefCode, type);
  }
}
