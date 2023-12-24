import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'module/typeorm/typeorm.module';
import { PageEntity } from './entity/page.entity';
import { PageRepository } from './repository/page.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([PageEntity]),
    TypeOrmExModule.forCustomRepository([PageRepository]),
  ],
  providers: [PageService],
  exports: [PageService, TypeOrmModule],
})
export class PageModule {}
