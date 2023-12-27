import { Injectable } from '@nestjs/common';

import { GetPagesReqInterface } from '@App/module/page/interface/request/getPages.interface';
import { GetPagesResInterface } from '@App/module/page/interface/response/getPages.interface';

import { GetSubscribePagesReqInterface } from './interface/request/getSubscribePages.interface';
import { GetSubscribePagesResInterface } from './interface/response/getSubscribePages.interface';
import { SubscribePageReqInterface } from './interface/request/subscribePage.interface';
import { SubscribePageResInterface } from '@App/module/student/interface/response/subscribePage.interface';
import { GetNewsFeedReqInterface } from '@App/module/news/interface/request/getNewsFeed.interface';
import { GetNewsFeedResInterface } from '@App/module/news/interface/response/getNewsFeed.interface';
import { GetNewsFeedBySchoolReqInterface } from '@App/module/news/interface/request/getNewsFeedBySchool.interface';
import { UnLockSubscribePageReqInterface } from '@App/module/student/interface/request/unLockSubscribePage.interface';
import { UnLockSubscribePageResInterface } from '@App/module/student/interface/response/unLockSubscribePage.interface';

import { NewsFeedRepository } from '@App/module/news/repository/newsFeed.repository';
import { SubscribeRepository } from './repository/subscribe.repository';
import { StudentRepository } from '@App/module/student/repository/student.repository';
import { PageRepository } from '@App/module/page/repository/page.repository';

@Injectable()
export class StudentService {
  constructor(
    private pageRepository: PageRepository,
    private studentRepository: StudentRepository,
    private subscribeRepository: SubscribeRepository,
    private newsFeedRepository: NewsFeedRepository,
  ) {}

  async getNonSubscribePages(
    data: GetPagesReqInterface,
  ): Promise<GetPagesResInterface> {
    try {
      await this.studentRepository.checkUser(data.studentIndex);
      return await this.pageRepository.getNonSubscribePages(data);
    } catch (err) {
      throw err;
    }
  }

  async getSubscribePages(
    data: GetSubscribePagesReqInterface,
  ): Promise<GetSubscribePagesResInterface> {
    try {
      await this.studentRepository.checkUser(data.studentIndex);
      return await this.subscribeRepository.getSubscribePages(data);
    } catch (err) {
      throw err;
    }
  }

  async subscribePage(
    data: SubscribePageReqInterface,
  ): Promise<SubscribePageResInterface> {
    try {
      await this.studentRepository.checkUser(data.studentIndex);
      await this.pageRepository.checkPage(data.pageIndex);
      return await this.subscribeRepository.subscribePage(data);
    } catch (err) {
      throw err;
    }
  }

  async getNewsFeed(
    data: GetNewsFeedReqInterface,
  ): Promise<GetNewsFeedResInterface> {
    try {
      await this.studentRepository.checkUser(data.studentIndex);
      return await this.newsFeedRepository.getNewsFeed(data);
    } catch (err) {
      throw err;
    }
  }

  async getNewsFeedBySchool(
    data: GetNewsFeedBySchoolReqInterface,
  ): Promise<GetNewsFeedResInterface> {
    try {
      await this.studentRepository.checkUser(data.studentIndex);
      return await this.newsFeedRepository.getNewsFeedBySchool(data);
    } catch (err) {
      throw err;
    }
  }

  async unLockSubscribePage(
    data: UnLockSubscribePageReqInterface,
  ): Promise<UnLockSubscribePageResInterface> {
    try {
      await this.studentRepository.checkUser(data.studentIndex);
      return await this.subscribeRepository.unLockSubscribePage(data);
    } catch (err) {
      throw err;
    }
  }
}
