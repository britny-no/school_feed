import { Expose, Type, Exclude } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';

@Exclude()
export class GetNewsFeedReqDto {
  @ApiProperty({
    name: 'student_index',
    description: '학생 인덱스(실제 배포시에는 헤더에 암호화 시켜서)',
    required: true,
  })
  @Expose({ name: 'student_index' })
  @IsString({
    context: {
      errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
      detailCode: DetailCodeEnum.NOT_A_STRING,
      field: 'student_index',
    },
  })
  @IsNotEmpty({
    context: {
      errorCode: ErrorCodeEnum.DATA_NOT_EXISTS,
      detailCode: DetailCodeEnum.REQUEST_DATA_NOT_EXIST,
      field: 'student_index',
    },
  })
  studentIndex: string;

  @ApiProperty({
    name: 'skip',
    description: '페이지네이션 오프셋',
    required: true,
  })
  @Type(() => Number)
  @Expose({ name: 'skip' })
  @IsNumber(
    {},
    {
      context: {
        errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
        detailCode: DetailCodeEnum.NOT_A_NUMBER,
        field: 'skip',
      },
    },
  )
  @IsNotEmpty({
    context: {
      errorCode: ErrorCodeEnum.DATA_NOT_EXISTS,
      detailCode: DetailCodeEnum.REQUEST_DATA_NOT_EXIST,
      field: 'skip',
    },
  })
  skip: number;

  @ApiProperty({
    name: 'take',
    description: '조회 갯수',
    required: true,
  })
  @Type(() => Number)
  @Expose({ name: 'take' })
  @IsNumber(
    {},
    {
      context: {
        errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
        detailCode: DetailCodeEnum.NOT_A_NUMBER,
        field: 'take',
      },
    },
  )
  @IsNotEmpty({
    context: {
      errorCode: ErrorCodeEnum.DATA_NOT_EXISTS,
      detailCode: DetailCodeEnum.REQUEST_DATA_NOT_EXIST,
      field: 'take',
    },
  })
  take: number;
}
