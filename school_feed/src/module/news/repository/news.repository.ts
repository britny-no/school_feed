import { UseFilters } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CustomRepository } from '@App/decorator/typeormEx.decorator';

import { NewsEntity } from '../entity/news.entity';
import { SubscribeEntity } from '@App/module/student/entity/subscribe.entity';

import { CreateNewsReqInterface } from '../interface/request/createNews.interface';
import { ReviseNewsReqInterface } from '@App/module/news/interface/request/reviseNews.interface';
import { ReviseNewsResInterface } from '@App/module/news/interface/response/reviseNews.interface';
import { DeleteNewsReqInterface } from '@App/module/news/interface/request/deleteNews.interface';
import { DeleteNewsResInterface } from '@App/module/news/interface/response/deleteNews.interface';

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

  async reviseNews(
    data: ReviseNewsReqInterface,
  ): Promise<ReviseNewsResInterface> {
    try {
      const updateResult = await this.update(
        {
          newsIndex: data.newsIndex,
          pageIndex: data.pageIndex,
        },
        {
          title: data.title,
          contents: data.contents,
        },
      );

      return {
        data: null,
        msg:
          updateResult.affected === 1
            ? '소식 수정 성공'
            : '변경 사항이 없습니다',
      };
    } catch (err) {
      throw new QueryErrorException(err);
    }
  }

  async deleteNews(
    data: DeleteNewsReqInterface,
  ): Promise<DeleteNewsResInterface> {
    try {
      const deleteResult = await this.delete({
        newsIndex: data.newsIndex,
        pageIndex: data.pageIndex,
      });

      return {
        data: null,
        msg:
          deleteResult.affected === 1
            ? '소식 삭제 성공'
            : '변경 사항이 없습니다',
      };
    } catch (err) {
      throw new QueryErrorException(err);
    }
  }
}
