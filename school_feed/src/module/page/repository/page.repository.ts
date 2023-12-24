import { UseFilters } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomRepository } from 'decorator/typeormEx.decorator';

import { PageEntity } from '../entity/page.entity';

import { createPageReqInterface } from '../interface/request/createPage.interface';
import { createPageResInterface } from '../interface/response/createPage.interface';

import { DatabaseResult } from 'interface/index.interface';
import { ErrorCodeEnum } from 'enum/errorCode.enum';
import { DetailCodeEnum } from 'enum/detailCode.enum';
import { CommonErrorException } from 'exception/commonError.exception';
import { QueryErrorException } from 'exception/queryError.exception';

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
        // 중복 에러
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
