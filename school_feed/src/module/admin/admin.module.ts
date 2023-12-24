import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PageModule } from 'module/page/page.module';
import { RmqModule } from '../rmq/rmq.module';

import { TypeOrmExModule } from 'module/typeorm/typeorm.module';
import { PageRepository } from '../page/repository/page.repository';
@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([PageRepository]),
    RmqModule,
    PageModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
