import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageEntity } from './entity/page.entity';

import { createPageInterface } from './interface/createPage.interface';
@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageEntity)
    private readonly pageRepository: Repository<PageEntity>,
  ) {}

  // custom repository 지양으로 서비스화
  createPage(data: createPageInterface) {
    try {
      console.log(data);
      return this.pageRepository.save(data);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
