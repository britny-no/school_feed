import { Injectable } from '@nestjs/common';

import { ServiceResult } from '../../interface/index.interface';
import { RmqService } from '@App/module/rmq/rmq.service';
import { PageRepository } from '@App/module/page/repository/page.repository';

import { createPageReqInterface } from '@App/module/page/interface/request/createPage.interface';
import { createPageResInterface } from '@App/module/page/interface/response/createPage.interface';
@Injectable()
export class AdminService {
  constructor(
    private rmqService: RmqService,
    private PageRepository: PageRepository,
  ) {}

  async createPage(
    data: createPageReqInterface,
  ): Promise<ServiceResult<createPageResInterface>> {
    try {
      return await this.PageRepository.createPage(data);
    } catch (err) {
      throw err;
    }
  }
}
