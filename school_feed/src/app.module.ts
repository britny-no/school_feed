import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './module/admin/admin.module';
import { StudentModule } from './module/student/student.module';
import { NewsModule } from './module/news/news.module';
import { RmqModule } from './module/rmq/rmq.module';
import { PageModule } from './module/page/page.module';

import { WinstonConfig } from 'util/winston.util';

import {
  EnvConfig,
  DbConfig,
  // RedisConfig,
} from 'config/index';

@Module({
  imports: [
    EnvConfig,
    DbConfig,
    WinstonConfig,
    AdminModule,
    StudentModule,
    NewsModule,
    PageModule,
    RmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
