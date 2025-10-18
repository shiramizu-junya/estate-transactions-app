import { EstateTransactionType } from '../types/estate-transaction';
import { Injectable } from '@nestjs/common';
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

  searchData(year?: number, prefCode?: number, type?: number) {
    let result = this.allData;

    if (year) {
      result = result.filter((item) => item.year === year);
    }

    if (prefCode) {
      result = result.filter((item) => item.prefectureCode === prefCode);
    }

    if (type) {
      result = result.filter((item) => item.type === type);
    }

    return result;
  }
}
