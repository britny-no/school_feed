import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class createPageReqDto {
  @IsString()
  @Expose({ name: 'page_name' })
  pageName: string;

  @IsString()
  @Expose({ name: 'scholl_name' })
  schollName: string;

  @IsString()
  @Expose({ name: 'short_description' })
  shortDescription: string;
}
