import { SearchEstateDto } from './search-estate.dto';
import { validationConfig } from '../../config/validation.config';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

describe('SearchEstateDto', () => {
  const validateDto = async (data: any) => {
    const dto = plainToInstance(SearchEstateDto, data);
    const errors = await validate(dto, validationConfig);
    return errors;
  };

  const getErrorMessages = (errors: ValidationError[]): string[] => {
    return errors.flatMap((error) => Object.values(error.constraints || {}));
  };

  describe('正常系テストケース', () => {
    test('全パラメータが正しい場合、バリデーションエラーが無いこと', async () => {
      const errors = await validateDto({
        year: '2015',
        prefCode: '13',
        type: '1',
      });

      expect(errors.length).toBe(0);
    });
  });

  describe('異常系テストケース - 必須パラメータ不足', () => {
    test('yearが無い場合、エラーになること', async () => {
      const errors = await validateDto({
        prefCode: '13',
        type: '1',
      });

      expect(errors.length).toBe(1);

      const messages = getErrorMessages(errors);
      expect(messages).toEqual(['yearは必須です']);
    });

    test('prefCodeが無い場合、エラーになること', async () => {
      const errors = await validateDto({
        year: '2015',
        type: '1',
      });

      expect(errors.length).toBe(1);

      const messages = getErrorMessages(errors);
      expect(messages).toEqual(['prefCodeは必須です']);
    });

    test('typeが無い場合、エラーになること', async () => {
      const errors = await validateDto({
        year: '2015',
        prefCode: '13',
      });

      expect(errors.length).toBe(1);

      const messages = getErrorMessages(errors);
      expect(messages).toEqual(['typeは必須です']);
    });

    test('全パラメータが無い場合、エラーになること', async () => {
      const errors = await validateDto({});

      expect(errors.length).toBe(3);

      const messages = getErrorMessages(errors);
      expect(messages).toEqual(['yearは必須です', 'prefCodeは必須です', 'typeは必須です']);
    });
  });

  describe('異常系テストケース - yearの検証', () => {
    test('yearが2014（最小値未満）の場合、エラーになること', async () => {
      const errors = await validateDto({
        year: '2014',
        prefCode: '13',
        type: '1',
      });

      expect(errors.length).toBe(1);

      const messages = getErrorMessages(errors);
      expect(messages).toEqual(['yearは2015以上を指定してください']);
    });

    test('yearが2019（最大値超過）の場合、エラーになること', async () => {
      const errors = await validateDto({
        year: '2019',
        prefCode: '13',
        type: '1',
      });

      expect(errors.length).toBe(1);

      const messages = getErrorMessages(errors);
      expect(messages).toEqual(['yearは2018以下を指定してください']);
    });

    test('yearが文字列（test）の場合、エラーになること', async () => {
      const errors = await validateDto({
        year: 'test',
        prefCode: '13',
        type: '1',
      });

      expect(errors.length).toBe(1);

      const messages = getErrorMessages(errors);
      expect(messages).toEqual(['yearは整数で指定してください']);
    });
  });

  describe('異常系テストケース - prefCodeの検証', () => {
    test('prefCodeが7（範囲外）の場合、エラーになること', async () => {
      const errors = await validateDto({
        year: '2015',
        prefCode: '7',
        type: '1',
      });

      expect(errors.length).toBe(1);

      const messages = getErrorMessages(errors);
      expect(messages).toEqual(['prefCodeは8〜14（関東地方）を指定してください']);
    });

    test('prefCodeが15（範囲外）の場合、エラーになること', async () => {
      const errors = await validateDto({
        year: '2015',
        prefCode: '15',
        type: '1',
      });

      expect(errors.length).toBe(1);

      const messages = getErrorMessages(errors);
      expect(messages).toEqual(['prefCodeは8〜14（関東地方）を指定してください']);
    });

    test('prefCodeが文字列（tokyo）の場合、エラーになること', async () => {
      const errors = await validateDto({
        year: '2015',
        prefCode: 'tokyo',
        type: '1',
      });

      expect(errors.length).toBe(1);

      const messages = getErrorMessages(errors);
      expect(messages).toEqual(['prefCodeは整数で指定してください']);
    });
  });

  describe('異常系テストケース - typeの検証', () => {
    test('typeが0（範囲外）の場合、エラーになること', async () => {
      const errors = await validateDto({
        year: '2015',
        prefCode: '13',
        type: '0',
      });

      expect(errors.length).toBe(1);

      const messages = getErrorMessages(errors);
      expect(messages).toEqual(['typeは1（住宅地）または2（商業地）を指定してください']);
    });

    test('typeが3（範囲外）の場合、エラーになること', async () => {
      const errors = await validateDto({
        year: '2015',
        prefCode: '13',
        type: '3',
      });

      expect(errors.length).toBe(1);

      const messages = getErrorMessages(errors);
      expect(messages).toEqual(['typeは1（住宅地）または2（商業地）を指定してください']);
    });

    test('typeが文字列（residential）の場合、エラーになること', async () => {
      const errors = await validateDto({
        year: '2015',
        prefCode: '13',
        type: 'residential',
      });

      expect(errors.length).toBe(1);

      const messages = getErrorMessages(errors);
      expect(messages).toEqual(['typeは整数で指定してください']);
    });
  });
});
