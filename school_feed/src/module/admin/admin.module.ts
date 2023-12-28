import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PageModule } from '@App/module/page/page.module';
import { RmqModule } from '@App/module/rmq/rmq.module';

import { TypeOrmExModule } from '@App/module/typeorm/typeorm.module';
import { PageRepository } from '@App/module/page/repository/page.repository';
import { AdminRepository } from '@App/module/admin/repository/admin.repository';
import { NewsRepository } from '@App/module/news/repository/news.repository';
import { SubscribeRepository } from '@App/module/student/repository/subscribe.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      PageRepository,
      AdminRepository,
      NewsRepository,
      SubscribeRepository,
    ]),
    RmqModule,
    PageModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
