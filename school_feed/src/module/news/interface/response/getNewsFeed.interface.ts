import { NewsFeedEntity } from '@App/module/news/entity/newsFeed.entity';

export interface GetNewsFeedResInterface {
  data: NewsFeedEntity[];
  msg?: string;
}
