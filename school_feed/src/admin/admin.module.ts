import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { RmqModule } from './../rmq/rmq.module';
@Module({
  imports: [RmqModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
