import { StudentRepository } from '@App/module/student/repository/student.repository';
import { Injectable } from '@nestjs/common';

import { ServiceResult } from '@App/interface/index.interface';
import { getNonSubscribePagesReqInterface } from '@App/module/page/interface/request/getNonSubscribePages.interface';
import { getNonSubscribePagesResInterface } from '@App/module/page/interface/response/getNonSubscribePages.interface';

import { PageRepository } from '@App/module/page/repository/page.repository';

@Injectable()
export class StudentService {
  constructor(
    private pageRepository: PageRepository,
    private studentRepository: StudentRepository,
  ) {}

  async getNonSubscribePages(
    data: getNonSubscribePagesReqInterface,
  ): Promise<ServiceResult<getNonSubscribePagesResInterface>> {
    try {
      await this.studentRepository.checkUser(data.studentIndex);
      return await this.pageRepository.getNonSubscribePages(data);
    } catch (err) {
      throw err;
    }
  }
}
