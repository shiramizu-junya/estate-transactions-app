import { EstateTransactionType } from '../types/estate-transaction';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EstateTransactionService {
  private allData: EstateTransactionType[] = [];

  constructor() {
    const filePath = path.join(__dirname, '..', 'assets', 'estate_transactions.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    this.allData = JSON.parse(fileData) as EstateTransactionType[];
  }

  searchData(year: number, prefCode: number, type: number) {
    const result = this.allData.filter(
      (item) => item.year === year && item.prefectureCode === prefCode && item.type === type,
    );

    if (!result.length) {
      throw new NotFoundException(
        `指定された条件のデータが見つかりませんでした（year: ${year}, prefCode: ${prefCode}, type: ${type}）`,
      );
    }

    return result;
  }
}
