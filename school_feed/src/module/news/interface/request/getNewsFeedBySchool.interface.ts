import { GetNewsFeedReqInterface } from '@App/module/news/interface/request/getNewsFeed.interface';

export interface GetNewsFeedBySchoolReqInterface
  extends GetNewsFeedReqInterface {
  pageIndex: string;
}
