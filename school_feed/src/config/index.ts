import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'admin/entity/admin.entity';
import { PageEntity } from 'page/entity/page.entity';
import { NewsEntity } from 'news/entity/news.entity';
import { NewsFeedEntity } from 'news/entity/news-feed.entity';
import { StudentEntity } from 'student/entity/student.entity';
import { SubscribeEntity } from 'student/entity/subscribe.entity';

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
    // subscribers: [UserSubscriber],
    // entities: [join(__dirname, "/**/*.entity.js")],
    // synchronize: true,
  }),
});
