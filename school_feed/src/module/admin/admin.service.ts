import { Injectable } from '@nestjs/common';

import { ServiceResult } from '../../interface/index.interface';
import { RmqService } from '@App/module/rmq/rmq.service';
import { PageRepository } from '@App/module/page/repository/page.repository';
import { AdminRepository } from '@App/module/admin/repository/admin.repository';

import { CreatePageReqInterface } from '@App/module/page/interface/request/createPage.interface';
import { CreatePageResInterface } from '@App/module/page/interface/response/createPage.interface';
@Injectable()
export class AdminService {
  constructor(
    private rmqService: RmqService,
    private pageRepository: PageRepository,
    private adminRepository: AdminRepository,
  ) {}

  async createPage(
    data: CreatePageReqInterface,
  ): Promise<ServiceResult<CreatePageResInterface>> {
    try {
      // 로그인 과정이 없기에, 등록된 유저인지 확인
      await this.adminRepository.checkUser(data.adminIndex);
      return await this.pageRepository.createPage(data);
    } catch (err) {
      throw err;
    }
  }
}
