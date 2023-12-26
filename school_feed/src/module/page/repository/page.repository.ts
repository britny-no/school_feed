import { UseFilters } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CustomRepository } from '@App/decorator/typeormEx.decorator';

import { PageEntity } from '../entity/page.entity';
import { SubscribeEntity } from '@App/module/student/entity/subscribe.entity';

import { createPageReqInterface } from '../interface/request/createPage.interface';
import { createPageResInterface } from '../interface/response/createPage.interface';

import { getNonSubscribePagesReqInterface } from '@App/module/page/interface/request/getNonSubscribePages.interface';
import { getNonSubscribePagesResInterface } from '@App/module/page/interface/response/getNonSubscribePages.interface';

import { DatabaseResult } from '@App/interface/index.interface';
import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';
import { CommonErrorException } from '@App/exception/commonError.exception';
import { QueryErrorException } from '@App/exception/queryError.exception';

@CustomRepository(PageEntity)
export class PageRepository extends Repository<PageEntity> {
  async createPage(
    data: createPageReqInterface,
  ): Promise<DatabaseResult<createPageResInterface>> {
    try {
      await this.insert(data);

      return {
        data: null,
        msg: '페이지 생성에 성공했습니다',
      };
    } catch (err) {
      switch (err.code) {
        case '23505':
          throw new CommonErrorException(
            {
              errorCode: ErrorCodeEnum.INVALID_DATA,
              detailCode: DetailCodeEnum.DATA_DUPLICATE,
            },
            403,
          );
        default:
          throw new QueryErrorException(err);
      }
    }
  }

  async getNonSubscribePages(
    data: getNonSubscribePagesReqInterface,
  ): Promise<DatabaseResult<getNonSubscribePagesResInterface>> {
    // ): Promise<any> {
    try {
      // query 최적화 위해 raw처리
      const db = this.manager;
      const selectResult = await db.query(
        `select p.page_name, p.school_name, p.short_description from "PAGE" as p left join (SELECT page_index, status FROM public."SUBSCRIBE" where student_index = $1) as s on p.page_index = s.page_index where  (s.status is NULL or s.status != 1)`,
        [data.studentIndex],
      );
      const entityResult = selectResult.map((v) => {
        return this.create({
          pageName: v.page_name,
          schoolName: v.school_name,
          shortDescription: v.short_description,
        });
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
