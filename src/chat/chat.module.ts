import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { Rooms } from './Rooms.entity';
import { AppController } from 'src/app.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms])],
  providers: [ChatService, AppController, ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
