import { Injectable } from '@nestjs/common';

import { ServiceResult } from '@App/interface/index.interface';
import { GetPagesReqInterface } from '@App/module/page/interface/request/getPages.interface';
import { GetPagesResInterface } from '@App/module/page/interface/response/getPages.interface';

import { GetSubscribePagesReqInterface } from './interface/request/getSubscribePages.interface';
import { GetSubscribePagesResInterface } from './interface/response/getSubscribePages.interface';
import { SubscribePageReqInterface } from './interface/request/subscribePage.interface';
import { SubscribePageResInterface } from '@App/module/student/interface/response/subscribePage.interface';
import { SubscribeRepository } from './repository/subscribe.repository';
import { StudentRepository } from '@App/module/student/repository/student.repository';

import { PageRepository } from '@App/module/page/repository/page.repository';

@Injectable()
export class StudentService {
  constructor(
    private pageRepository: PageRepository,
    private studentRepository: StudentRepository,
    private subscribeRepository: SubscribeRepository,
  ) {}

  async getNonSubscribePages(
    data: GetPagesReqInterface,
  ): Promise<ServiceResult<GetPagesResInterface>> {
    try {
      await this.studentRepository.checkUser(data.studentIndex);
      return await this.pageRepository.getNonSubscribePages(data);
    } catch (err) {
      throw err;
    }
  }

  async getSubscribePages(
    data: GetSubscribePagesReqInterface,
  ): Promise<ServiceResult<GetSubscribePagesResInterface>> {
    try {
      await this.studentRepository.checkUser(data.studentIndex);
      return await this.subscribeRepository.getSubscribePages(data);
    } catch (err) {
      throw err;
    }
  }

  async subscribePage(
    data: SubscribePageReqInterface,
  ): Promise<ServiceResult<SubscribePageResInterface>> {
    try {
      await this.studentRepository.checkUser(data.studentIndex);
      await this.pageRepository.checkPage(data.pageIndex);
      return await this.subscribeRepository.subscribePage(data);
    } catch (err) {
      throw err;
    }
  }
}
