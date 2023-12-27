import { UseFilters } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CustomRepository } from '@App/decorator/typeormEx.decorator';

import { NewsEntity } from '../entity/news.entity';
import { NewsFeedEntity } from '../entity/newsFeed.entity';

import { GetNewsFeedReqInterface } from '@App/module/news/interface/request/getNewsFeed.interface';
import { GetNewsFeedResInterface } from '@App/module/news/interface/response/getNewsFeed.interface';
import { GetNewsFeedBySchoolReqInterface } from '@App/module/news/interface/request/getNewsFeedBySchool.interface';

import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';
import { CommonErrorException } from '@App/exception/commonError.exception';
import { QueryErrorException } from '@App/exception/queryError.exception';

@CustomRepository(NewsFeedEntity)
export class NewsFeedRepository extends Repository<NewsFeedEntity> {
  async getNewsFeed(
    data: GetNewsFeedReqInterface,
  ): Promise<GetNewsFeedResInterface> {
    try {
      const entityResult = await this.find({
        where: {
          studentIndex: data.studentIndex,
        },
        skip: data.skip,
        take: data.take,
        order: {
          newsCreateDate: 'DESC',
        },
        relations: ['news'],
      });

      return {
        data: entityResult,
        msg: '조회 완료',
      };
    } catch (err) {
      throw new QueryErrorException(err);
    }
  }

  async getNewsFeedBySchool(
    data: GetNewsFeedBySchoolReqInterface,
  ): Promise<GetNewsFeedResInterface> {
    try {
      const entityResult = await this.find({
        where: {
          studentIndex: data.studentIndex,
          pageIndex: data.pageIndex,
        },
        skip: data.skip,
        take: data.take,
        order: {
          newsCreateDate: 'DESC',
        },
        relations: ['news'],
      });

      return {
        data: entityResult,
        msg: '조회 완료',
      };
    } catch (err) {
      throw new QueryErrorException(err);
    }
  }
}
