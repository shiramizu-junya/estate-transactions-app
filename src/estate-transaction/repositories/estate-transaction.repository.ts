import { EstateTransactionType } from '../../types/estate-transaction';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EstateTransactionRepository {
  private allData: EstateTransactionType[] = [];

  constructor() {
    const filePath = path.join(process.cwd(), 'src', 'assets', 'estate_transactions.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    this.allData = JSON.parse(fileData) as EstateTransactionType[];
  }

  findByConditions(year: number, prefCode: number, type: number) {
    const result = this.allData.filter(
      (item) => item.year === year && item.prefectureCode === prefCode && item.type === type,
    );
    return result;
  }
}
