import { SearchEstateDto } from './dto/search-estate.dto';
import { EstateTransactionController } from './estate-transaction.controller';
import { EstateTransactionService } from './estate-transaction.service';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('EstateTransactionController', () => {
  let controller: EstateTransactionController;
  let service: EstateTransactionService;

  const mockService = {
    searchData: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstateTransactionController],
      providers: [
        {
          provide: EstateTransactionService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<EstateTransactionController>(EstateTransactionController);
    service = module.get<EstateTransactionService>(EstateTransactionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getEstateData', () => {
    it('正しいパラメータでServiceを呼び出し、Serviceの返り値をそのまま返すこと', () => {
      const query: SearchEstateDto = {
        year: 2015,
        prefCode: 13,
        type: 1,
      };
      const mockResult = {
        result: {
          prefectureCode: '13',
          prefectureName: '東京都',
          type: '1',
          years: [{ year: 2015, value: 324740 }],
        },
      };
      mockService.searchData.mockReturnValue(mockResult);

      const result = controller.getEstateData(query);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.searchData).toHaveBeenCalledWith(2015, 13, 1);
      expect(result).toBe(mockResult);
    });

    it('Serviceが例外を投げた場合、そのまま例外を投げること', () => {
      const query: SearchEstateDto = {
        year: 9999,
        prefCode: 99,
        type: 9,
      };

      mockService.searchData.mockImplementation(() => {
        throw new NotFoundException('指定された条件のデータが見つかりませんでした');
      });

      expect(() => {
        controller.getEstateData(query);
      }).toThrow(NotFoundException);

      expect(() => {
        controller.getEstateData(query);
      }).toThrow('指定された条件のデータが見つかりませんでした');
    });
  });
});
