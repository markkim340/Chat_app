import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rooms } from './rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms)
    private readonly roomsRepository: Repository<Rooms>,
  ) {}

  async createChatRoom(socketId) {
    return await this.roomsRepository.save(socketId);
  }

  async getChatRooms() {
    return await this.roomsRepository.find();
  }

  async getChatRoomById(id) {
    return await this.roomsRepository.findOneBy(id);
  }

  async sendMessage(id, message) {
    const room = await this.getChatRoomById(id);
    room.messages.push(message);
    await this.roomsRepository.save(room);
  }
}
