import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsGateway } from './rooms.gateway';
import { Rooms } from './rooms.entity';
import { AppController } from 'src/app.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms])],
  providers: [RoomsService, AppController, RoomsGateway],
  exports: [RoomsGateway],
})
export class RoomsModule {}
