import { EstateTransactionRepository } from './estate-transaction.repository';

describe('EstateTransactionRepository', () => {
  let repository: EstateTransactionRepository;

  beforeEach(() => {
    repository = new EstateTransactionRepository();
  });

  describe('findByConditions', () => {
    test('条件に合うデータを全て返すこと', () => {
      const result = repository.findByConditions(2016, 13, 1);

      expect(result.length).toBe(2);
      expect(result[0].year).toBe(2016);
      expect(result[0].prefectureCode).toBe(13);
      expect(result[0].type).toBe(1);
      expect(result[1].year).toBe(2016);
      expect(result[1].prefectureCode).toBe(13);
      expect(result[1].type).toBe(1);
    });

    test('条件に合うデータがない場合は空配列を返すこと', () => {
      const result = repository.findByConditions(9999, 99, 9);

      expect(result).toEqual([]);
    });

    test('異なる都道府県のデータを取得できること', () => {
      const result = repository.findByConditions(2015, 14, 1);

      expect(result.length).toBe(1);
      expect(result[0].prefectureCode).toBe(14);
    });

    test('商業地（type=2）のデータを取得できること', () => {
      const result = repository.findByConditions(2015, 13, 2);

      expect(result.length).toBe(1);
      expect(result[0].type).toBe(2);
    });
  });
});
