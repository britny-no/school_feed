import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PageModule } from '@App/module/page/page.module';
import { RmqModule } from '../rmq/rmq.module';

import { TypeOrmExModule } from '@App/module/typeorm/typeorm.module';
import { PageRepository } from '../page/repository/page.repository';
import { AdminRepository } from '@App/module/admin/repository/admin.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([PageRepository, AdminRepository]),
    RmqModule,
    PageModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
