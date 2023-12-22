import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createPageReqDto {
  @ApiProperty({ description: '페이지명', required: true })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'page_name' })
  pageName: string;

  @ApiProperty({ description: '학교명', required: true })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'school_name' })
  schoolName: string;

  @ApiProperty({ description: '페이지에 관한 짧은 설명', required: true })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'short_description' })
  shortDescription: string;
}
