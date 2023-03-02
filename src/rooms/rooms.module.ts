import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsGateway } from './rooms.gateway';
import { Rooms } from './rooms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms])],
  providers: [RoomsService, RoomsGateway],
  exports: [RoomsGateway],
})
export class RoomsModule {}
