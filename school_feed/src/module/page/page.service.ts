import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageEntity } from './entity/page.entity';

@Injectable()
export class PageService {
  constructor() {}

  // custom repository 지양으로 서비스화
}
