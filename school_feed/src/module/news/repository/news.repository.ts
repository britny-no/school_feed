import { UseFilters } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CustomRepository } from '@App/decorator/typeormEx.decorator';

import { NewsEntity } from '../entity/news.entity';
import { SubscribeEntity } from '@App/module/student/entity/subscribe.entity';

import { CreateNewsReqInterface } from '../interface/request/createNews.interface';
import { DatabaseResult } from '@App/interface/index.interface';
import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';
import { CommonErrorException } from '@App/exception/commonError.exception';
import { QueryErrorException } from '@App/exception/queryError.exception';

@CustomRepository(NewsEntity)
export class NewsRepository extends Repository<NewsEntity> {
  async createNews(data: CreateNewsReqInterface): Promise<{
    newsIndex: string;
    createDate: Date;
  }> {
    try {
      const insertResult = await this.insert({
        pageIndex: data.pageIndex,
        title: data.title,
        contents: data.contents,
      });
      const resultTar =
        insertResult && insertResult.generatedMaps
          ? insertResult.generatedMaps[0]
          : null;

      if (resultTar) {
        return {
          newsIndex: resultTar.newsIndex,
          createDate: resultTar.createDate,
        };
      } else {
        throw { code: 'INSERT_ERROR' };
      }
    } catch (err) {
      switch (err.code) {
        case 'INSERT_ERROR':
          throw new CommonErrorException(
            {
              errorCode: ErrorCodeEnum.SERVER_ERROR,
              detailCode: DetailCodeEnum.INSERT_ERROR,
            },
            500,
          );
        default:
          throw new QueryErrorException(err);
      }
    }
  }
}
