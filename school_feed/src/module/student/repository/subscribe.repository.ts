import { UseFilters } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomRepository } from '@App/decorator/typeormEx.decorator';

import { SubscribeEntity } from '@App/module/student/entity/subscribe.entity';
import { DatabaseResult } from '@App/interface/index.interface';
import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';
import { CommonErrorException } from '@App/exception/commonError.exception';
import { QueryErrorException } from '@App/exception/queryError.exception';

@CustomRepository(SubscribeEntity)
export class SubscribeRepository extends Repository<SubscribeEntity> {}
