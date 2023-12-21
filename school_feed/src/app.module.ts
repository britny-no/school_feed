import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { NewsModule } from './news/news.module';
import { RmqModule } from './rmq/rmq.module';
import { PageModule } from './page/page.module';

import { WinstonConfig } from 'config/winston.util';

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
