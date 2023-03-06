import { LoggerModule } from './logger/logger.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from './rooms/rooms.module';
import databaseConfig from './config/database.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import session from 'express-session';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static',
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        ...config.get('database'),
      }),
    }),
    LoggerModule,
    RoomsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
