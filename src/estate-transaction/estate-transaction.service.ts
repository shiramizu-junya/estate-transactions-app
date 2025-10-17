import { EstateTransactionType } from '../types/estate-transaction';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EstateTransactionService {
  getAllData() {
    const filePath = path.join(__dirname, '..', 'assets', 'estate_transactions.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileData) as EstateTransactionType[];
    return data;
  }
}
