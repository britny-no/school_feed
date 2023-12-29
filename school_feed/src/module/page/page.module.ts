import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@App/module/typeorm/typeorm.module';
import { PageService } from './page.service';
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
