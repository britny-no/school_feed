import { Injectable } from '@nestjs/common';

import { RmqService } from 'rmq/rmq.service';
import { PageService } from 'page/page.service';

@Injectable()
export class AdminService {
  constructor(
    private rmqService: RmqService,
    private pageService: PageService,
  ) {}
}
