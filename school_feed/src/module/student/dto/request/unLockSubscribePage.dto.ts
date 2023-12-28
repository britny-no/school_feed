import { Expose, Type, Exclude } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';

@Exclude()
export class UnLockSubscribePageReqDto {
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
    name: 'page_index',
    description: '페이지 인덱스',
    required: true,
  })
  @Expose({ name: 'page_index' })
  @IsString({
    context: {
      errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
      detailCode: DetailCodeEnum.NOT_A_STRING,
      field: 'page_index',
    },
  })
  @IsNotEmpty({
    context: {
      errorCode: ErrorCodeEnum.DATA_NOT_EXISTS,
      detailCode: DetailCodeEnum.REQUEST_DATA_NOT_EXIST,
      field: 'page_index',
    },
  })
  pageIndex: string;
}
