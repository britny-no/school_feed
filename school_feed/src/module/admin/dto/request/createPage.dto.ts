import { Expose, Transform, Exclude } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';

@Exclude()
export class CreatePageReqDto {
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

  @ApiProperty({ name: 'page_name', description: '페이지명', required: true })
  @Expose({ name: 'page_name' })
  @IsString({
    context: {
      errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
      detailCode: DetailCodeEnum.NOT_A_STRING,
      field: 'page_name',
    },
  })
  @IsNotEmpty({
    context: {
      errorCode: ErrorCodeEnum.DATA_NOT_EXISTS,
      detailCode: DetailCodeEnum.REQUEST_DATA_NOT_EXIST,
      field: 'page_name',
    },
  })
  pageName: string;

  @ApiProperty({ name: 'school_name', description: '학교명', required: true })
  @Expose({ name: 'school_name' })
  @IsString({
    context: {
      errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
      detailCode: DetailCodeEnum.NOT_A_STRING,
      field: 'school_name',
    },
  })
  @IsNotEmpty({
    context: {
      errorCode: ErrorCodeEnum.DATA_NOT_EXISTS,
      detailCode: DetailCodeEnum.REQUEST_DATA_NOT_EXIST,
      field: 'school_name',
    },
  })
  schoolName: string;

  @ApiProperty({
    name: 'short_description',
    description: '페이지에 관한 짧은 설명',
    required: true,
  })
  @Expose({ name: 'short_description' })
  @IsString({
    context: {
      errorCode: ErrorCodeEnum.INVALID_DATA_TYPE,
      detailCode: DetailCodeEnum.NOT_A_STRING,
      field: 'short_description',
    },
  })
  @IsNotEmpty({
    context: {
      errorCode: ErrorCodeEnum.DATA_NOT_EXISTS,
      detailCode: DetailCodeEnum.REQUEST_DATA_NOT_EXIST,
      field: 'short_description',
    },
  })
  shortDescription: string;
}
