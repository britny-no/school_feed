import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { NewsModule } from './news/news.module';

import {
  EnvConfig,
  DbConfig,
  // RedisConfig,
} from 'config/index';

@Module({
  imports: [EnvConfig, DbConfig, AdminModule, StudentModule, NewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
