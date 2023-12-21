import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'admin/entity/admin.entity';

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
    entities: [AdminEntity],
    // subscribers: [UserSubscriber],
    // entities: [join(__dirname, "/**/*.entity.js")],
    // synchronize: true,
  }),
});
