import { EstateTransactionService } from './estate-transaction.service';
import { EstateTransactionType } from '../types/estate-transaction';
import { EstateTransactionRepository } from './repositories/estate-transaction.repository';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

const createMockEstateData = (
  overrides?: Partial<EstateTransactionType>,
): EstateTransactionType => {
  return {
    year: 2015,
    prefectureCode: 13,
    type: 1,
    data: {
      result: {
        prefectureCode: '13',
        prefectureName: '東京都',
        type: '1',
        years: [{ year: 2015, value: 324740 }],
      },
    },
    ...overrides,
  };
};

describe('EstateTransactionService', () => {
  let service: EstateTransactionService;
  let repository: EstateTransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstateTransactionService, EstateTransactionRepository],
    }).compile();

    service = module.get<EstateTransactionService>(EstateTransactionService);
    repository = module.get<EstateTransactionRepository>(EstateTransactionRepository);
  });

  describe('searchData', () => {
    test('データが見つかった場合、dataを返すこと', () => {
      const mockData = [createMockEstateData()];
      const findByConditionsSpy = jest
        .spyOn(repository, 'findByConditions')
        .mockReturnValue(mockData);

      const result = service.searchData(2015, 13, 1);

      expect(findByConditionsSpy).toHaveBeenCalledWith(2015, 13, 1);
      expect(result).toEqual(mockData);
    });

    test('データが見つからない場合、NotFoundExceptionを投げること', () => {
      jest.spyOn(repository, 'findByConditions').mockReturnValue([]);

      expect(() => {
        service.searchData(9999, 99, 9);
      }).toThrow(NotFoundException);
    });
  });
});
