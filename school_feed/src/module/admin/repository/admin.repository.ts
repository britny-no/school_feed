import { UseFilters } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CustomRepository } from '@App/decorator/typeormEx.decorator';

import { AdminEntity } from '@App/module/admin/entity/admin.entity';
import { SubscribeEntity } from '@App/module/student/entity/subscribe.entity';

// import { createPageReqInterface } from '../interface/request/createPage.interface';
// import { createPageResInterface } from '../interface/response/createPage.interface';

import { DatabaseResult } from '@App/interface/index.interface';
import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';
import { CommonErrorException } from '@App/exception/commonError.exception';
import { QueryErrorException } from '@App/exception/queryError.exception';

@CustomRepository(AdminEntity)
export class AdminRepository extends Repository<AdminEntity> {
  async checkUser(adminIndex: string) {
    try {
      const selectResult = await this.findOne({
        where: { adminIndex },
      });
      if (!selectResult) {
        throw { code: 'NO_USER' };
      }

      return true;
    } catch (err) {
      switch (err.code) {
        case 'NO_USER':
          throw new CommonErrorException(
            {
              errorCode: ErrorCodeEnum.INVALID_DATA,
              detailCode: DetailCodeEnum.NO_USER,
            },
            403,
          );
        default:
          throw new QueryErrorException(err);
      }
    }
  }
}
