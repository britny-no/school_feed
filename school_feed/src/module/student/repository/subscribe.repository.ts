import { UseFilters } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomRepository } from '@App/decorator/typeormEx.decorator';

import { SubscribePageReqInterface } from '@App/module/student/interface/request/subscribePage.interface';
import { SubscribePageResInterface } from '@App/module/student/interface/response/subscribePage.interface';
import { GetSubscribePagesReqInterface } from '@App/module/student/interface/request/getSubscribePages.interface';
import { GetSubscribePagesResInterface } from '@App/module/student/interface/response/getSubscribePages.interface';

import { SubscribeEntity } from '@App/module/student/entity/subscribe.entity';
import { DatabaseResult } from '@App/interface/index.interface';
import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';
import { CommonErrorException } from '@App/exception/commonError.exception';
import { QueryErrorException } from '@App/exception/queryError.exception';
import { PageEntity } from '@App/module/page/entity/page.entity';

@CustomRepository(SubscribeEntity)
export class SubscribeRepository extends Repository<SubscribeEntity> {
  private async checkSubscribePossible(
    data: SubscribePageReqInterface,
  ): Promise<{ code: string }> {
    try {
      const selectResult = await this.findOne({
        where: data,
      });
      if (selectResult) return { code: 'DUPLICATE_REQUEST' };
      return { code: 'PASS' };
    } catch (err) {
      return { code: 'DB_ERR', ...err };
    }
  }

  async subscribePage(
    data: SubscribePageReqInterface,
  ): Promise<DatabaseResult<SubscribePageResInterface>> {
    try {
      const subscribeAvailability = await this.checkSubscribePossible(data);
      switch (subscribeAvailability.code) {
        case 'DUPLICATE_REQUEST':
        case 'DB_ERR':
          throw subscribeAvailability;
        default:
          await this.insert(data);
      }

      return {
        data: null,
        msg: '구독 신청 완료',
      };
    } catch (err) {
      switch (err.code) {
        case 'DUPLICATE_REQUEST':
          throw new CommonErrorException(
            {
              errorCode: ErrorCodeEnum.INVALID_DATA,
              detailCode: DetailCodeEnum.DUPLICATE_REQUEST,
            },
            403,
          );
        default:
          throw new QueryErrorException(err);
      }
    }
  }

  async getSubscribePages(
    data: GetSubscribePagesReqInterface,
  ): Promise<DatabaseResult<GetSubscribePagesResInterface>> {
    try {
      const db = this.manager;
      const selectResult = await db.query(
        `select p.page_index, p.page_name, p.school_name, p.short_description from "PAGE" as p inner join (SELECT page_index, status FROM public."SUBSCRIBE" where student_index = $1) as s on p.page_index = s.page_index where  s.status = 1`,
        [data.studentIndex],
      );
      const entityResult = selectResult.map((v) => {
        const entity = new PageEntity();
        entity.pageIndex = v.page_index;
        entity.pageName = v.page_name;
        entity.schoolName = v.school_name;
        entity.shortDescription = v.short_description;
        return entity;
      });
      return {
        data: entityResult,
        msg: '조회 완료',
      };
    } catch (err) {
      throw new QueryErrorException(err);
    }
  }

  async getSubscribers(pageIndex: string) {
    try {
      const selectResult = await this.find({
        where: { pageIndex, status: 1 },
      });

      return selectResult;
    } catch (err) {
      throw new QueryErrorException(err);
    }
  }
}
