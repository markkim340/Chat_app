import { LoggerModule } from './logger/logger.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        ...config.get('database'),
      }),
    }),
    LoggerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
