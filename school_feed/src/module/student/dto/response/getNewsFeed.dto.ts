import { Expose, Type, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { NewsEntity } from '@App/module/news/entity/news.entity';
import { NewsFeedEntity } from '@App/module/news/entity/newsFeed.entity';

@Exclude()
export class News {
  @ApiProperty({ name: 'news_index', description: '뉴스 인덱스' })
  @Expose({ name: 'newsIndex' })
  news_index: string;

  @ApiProperty({ name: 'page_index', description: '페이지 인덱스' })
  @Expose({ name: 'pageIndex' })
  page_index: string;

  @ApiProperty({ name: 'title', description: '소식 제목' })
  @Expose({ name: 'title' })
  title: string;

  @ApiProperty({ name: 'contents', description: '소식 내용' })
  @Expose({ name: 'contents' })
  contents: string;
}

@Exclude()
export class NewsFeed {
  @ApiProperty({ name: 'feed_index', description: '피드 인덱스' })
  @Expose({ name: 'feedIndex' })
  feed_index: string;

  @ApiProperty({ name: 'news', description: '피드 정보', type: () => News })
  @Expose({ name: 'news' })
  @Type(() => News)
  news: News;
}

@Exclude()
export class GetNewsFeedResDto {
  @ApiProperty({
    name: 'data',
    description: '뉴스피드 값',
    type: () => NewsFeed,
  })
  @Type(() => NewsFeed)
  @Expose({ name: 'data' })
  data: NewsFeed[];

  @ApiProperty({ name: 'msg', description: '메세지' })
  @Expose({ name: 'msg' })
  msg: string;
}
