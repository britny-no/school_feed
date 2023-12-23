import { Expose, Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createPageReqDto {
  @ApiProperty({ description: '페이지명', required: true })
  @Expose({ name: 'page_name' })
  @IsString()
  @IsNotEmpty()
  pageName: string;

  @ApiProperty({ description: '학교명', required: true })
  @Expose({ name: 'school_name' })
  @IsString()
  @IsNotEmpty()
  schoolName: string;

  @ApiProperty({ description: '페이지에 관한 짧은 설명', required: true })
  @Expose({ name: 'short_description' })
  @IsString()
  @IsNotEmpty()
  shortDescription: string;
}
