import { UseFilters } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomRepository } from '@App/decorator/typeormEx.decorator';

import { StudentEntity } from '@App/module/student/entity/student.entity';

import { DatabaseResult } from '@App/interface/index.interface';
import { ErrorCodeEnum } from '@App/enum/errorCode.enum';
import { DetailCodeEnum } from '@App/enum/detailCode.enum';
import { CommonErrorException } from '@App/exception/commonError.exception';
import { QueryErrorException } from '@App/exception/queryError.exception';

@CustomRepository(StudentEntity)
export class StudentRepository extends Repository<StudentEntity> {
  async checkUser(studentIndex: string) {
    try {
      const selectResult = await this.findOne({
        where: { studentIndex },
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
