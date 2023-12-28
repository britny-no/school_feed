import { Expose, Transform, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CreateNewsResDto {
  @ApiProperty({ name: 'data', description: '빈값' })
  data: string;

  @ApiProperty({ name: 'msg', description: '메세지' })
  msg: string;
}
