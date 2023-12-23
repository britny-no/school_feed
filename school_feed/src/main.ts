import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from 'config/swagger.util';
import { SerializeInterceptor } from 'serialize-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  configService.get<string>('NODE_ENV', 'production') !== 'production'
    ? setupSwagger(app)
    : null;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(configService.get<string>('PORT', '4404'));
}
bootstrap();
