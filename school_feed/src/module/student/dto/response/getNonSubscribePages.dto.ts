import { Expose, Transform, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class GetNonSubscribePagesResDto {
  @ApiProperty({
    name: 'data',
    description: '구독 가능한 페이지 배열',
    type: () => Pages,
  })
  data: Pages[];

  @ApiProperty({ name: 'msg', description: '메세지' })
  msg: string;
}

class Pages {
  @ApiProperty({ name: 'page_index', description: '페이지 인덱스' })
  @Expose({ name: 'page_index' })
  pageIndex: string;

  @ApiProperty({ name: 'school_name', description: '학교명' })
  @Expose({ name: 'school_name' })
  schoolName: string;

  @ApiProperty({ name: 'short_description', description: '설명' })
  @Expose({ name: 'short_description' })
  shortDescription: string;
}
