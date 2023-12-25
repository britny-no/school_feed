import { UseFilters } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomRepository } from '@App/decorator/typeormEx.decorator';

import { PageEntity } from '../entity/page.entity';

import { createPageReqInterface } from '../interface/request/createPage.interface';
import { createPageResInterface } from '../interface/response/createPage.interface';

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
}
