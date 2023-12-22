import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PageEntity } from './entity/page.entity';
@Module({
  imports: [TypeOrmModule.forFeature([PageEntity])],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
