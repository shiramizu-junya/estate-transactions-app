import { Type } from 'class-transformer';
import { IsInt, IsIn, Min, Max, IsDefined } from 'class-validator';

export class SearchEstateDto {
  @IsDefined({ message: 'yearは必須です' })
  @Type(() => Number)
  @Min(2015, { message: 'yearは2015以上を指定してください' })
  @Max(2018, { message: 'yearは2018以下を指定してください' })
  @IsInt({ message: 'yearは整数で指定してください' })
  year: number;

  @IsDefined({ message: 'prefCodeは必須です' })
  @Type(() => Number)
  @IsIn([8, 9, 10, 11, 12, 13, 14], {
    message: 'prefCodeは8〜14（関東地方）を指定してください',
  })
  @IsInt({ message: 'prefCodeは整数で指定してください' })
  prefCode: number;

  @IsDefined({ message: 'typeは必須です' })
  @Type(() => Number)
  @IsIn([1, 2], {
    message: 'typeは1（住宅地）または2（商業地）を指定してください',
  })
  @IsInt({ message: 'typeは整数で指定してください' })
  type: number;
}
