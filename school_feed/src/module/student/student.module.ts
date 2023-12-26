import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

import { TypeOrmExModule } from '@App/module/typeorm/typeorm.module';
import { PageRepository } from '@App/module/page/repository/page.repository';
import { StudentRepository } from '@App/module/student/repository/student.repository';
import { SubscribeRepository } from './repository/subscribe.repository';
@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      PageRepository,
      StudentRepository,
      SubscribeRepository,
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
