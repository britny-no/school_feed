import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from '@App/module/admin/entity/admin.entity';
import { PageEntity } from '@App/module/page/entity/page.entity';
import { NewsEntity } from '@App/module/news/entity/news.entity';
import { NewsFeedEntity } from '@App/module/news/entity/newsFeed.entity';
import { StudentEntity } from '@App/module/student/entity/student.entity';
import { SubscribeEntity } from '@App/module/student/entity/subscribe.entity';

export const EnvConfig = ConfigModule.forRoot({
  cache: true,
  isGlobal: true,
});

export const DbConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DB'),
    entities: [
      AdminEntity,
      PageEntity,
      NewsEntity,
      NewsFeedEntity,
      StudentEntity,
      SubscribeEntity,
    ],
    synchronize: false,
    migrationsRun: false,
  }),
});
