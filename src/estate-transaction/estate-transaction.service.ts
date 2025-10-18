import { EstateTransactionRepository } from './repositories/estate-transaction.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class EstateTransactionService {
  constructor(private readonly repository: EstateTransactionRepository) {}

  searchData(year: number, prefectureCode: number, type: number) {
    const result = this.repository.findByConditions(year, prefectureCode, type);

    if (!result.length) {
      throw new NotFoundException(
        `指定された条件のデータが見つかりませんでした（year: ${year}, prefCode: ${prefectureCode}, type: ${type}）`,
      );
    }

    return result;
  }
}
