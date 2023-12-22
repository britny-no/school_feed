import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PageModule } from 'page/page.module';
import { RmqModule } from './../rmq/rmq.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import { PageEntity } from 'page/entity/page.entity';

@Module({
  imports: [RmqModule, PageModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
