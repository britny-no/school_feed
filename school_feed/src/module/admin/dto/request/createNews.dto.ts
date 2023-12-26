import { Expose, Transform, Exclude } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';

@Exclude()
export class CreateNewsReqDto {
  @ApiProperty({
    name: 'admin_index',
    description: '어드민 인덱스(실제 배포시에는 헤더에 암호화 시켜서)',
    required: true,
  })
  @Expose({ name: 'admin_index' })
  @IsString({
    context: {
      errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
      detailCode: DetailCodeEnum.NOT_A_STRING,
      field: 'admin_index',
    },
  })
  @IsNotEmpty({
    context: {
      errorCode: ErrorCodeEnum.DATA_NOT_EXISTS,
      detailCode: DetailCodeEnum.REQUEST_DATA_NOT_EXIST,
      field: 'admin_index',
    },
  })
  adminIndex: string;

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

  @ApiProperty({ name: 'title', description: '소식 제목', required: true })
  @Expose({ name: 'title' })
  @IsString({
    context: {
      errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
      detailCode: DetailCodeEnum.NOT_A_STRING,
      field: 'title',
    },
  })
  @IsNotEmpty({
    context: {
      errorCode: ErrorCodeEnum.DATA_NOT_EXISTS,
      detailCode: DetailCodeEnum.REQUEST_DATA_NOT_EXIST,
      field: 'title',
    },
  })
  title: string;

  @ApiProperty({ name: 'contents', description: '소식 내용', required: true })
  @Expose({ name: 'contents' })
  @IsString({
    context: {
      errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
      detailCode: DetailCodeEnum.NOT_A_STRING,
      field: 'contents',
    },
  })
  @IsNotEmpty({
    context: {
      errorCode: ErrorCodeEnum.DATA_NOT_EXISTS,
      detailCode: DetailCodeEnum.REQUEST_DATA_NOT_EXIST,
      field: 'contents',
    },
  })
  contents: string;
}
