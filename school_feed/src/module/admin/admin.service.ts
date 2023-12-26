import { Injectable } from '@nestjs/common';

import { ServiceResult } from '@App/interface/index.interface';
import { RmqService } from '@App/module/rmq/rmq.service';
import { PageRepository } from '@App/module/page/repository/page.repository';
import { AdminRepository } from '@App/module/admin/repository/admin.repository';
import { NewsRepository } from '@App/module/news/repository/news.repository';
import { SubscribeRepository } from '@App/module/student/repository/subscribe.repository';

import { CreatePageReqInterface } from '@App/module/page/interface/request/createPage.interface';
import { CreatePageResInterface } from '@App/module/page/interface/response/createPage.interface';
import { CreateNewsReqInterface } from '@App/module/news/interface/request/createNews.interface';
@Injectable()
export class AdminService {
  constructor(
    private rmqService: RmqService,
    private pageRepository: PageRepository,
    private adminRepository: AdminRepository,
    private newsRepository: NewsRepository,
    private subscribeRepository: SubscribeRepository,
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

  async createNews(
    data: CreateNewsReqInterface,
  ): Promise<ServiceResult<CreatePageResInterface>> {
    try {
      // 패이지 관리자인지 확인
      await this.pageRepository.checkPageAuth(data.pageIndex, data.adminIndex);
      const { newsIndex, createDate } = await this.newsRepository.createNews(
        data,
      );
      const subscriber = await this.subscribeRepository.getSubscribers(
        data.pageIndex,
      );

      if (subscriber[0]) {
        this.rmqService.sendMsg(
          JSON.stringify({
            newsIndex,
            createDate,
            pageIndex: data.pageIndex,
            subscriber: subscriber.map((v) => v.studentIndex),
          }),
        );
      }

      return {
        data: null,
        msg: '소식 등록 성공',
      };
    } catch (err) {
      throw err;
    }
  }
}
