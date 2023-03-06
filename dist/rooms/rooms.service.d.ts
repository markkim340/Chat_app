import { Repository } from 'typeorm';
import { Rooms } from './rooms.entity';
export declare class RoomsService {
    private readonly roomsRepository;
    constructor(roomsRepository: Repository<Rooms>);
    createChatRoom(socketId: any): Promise<any>;
    getChatRooms(): Promise<Rooms[]>;
    getChatRoomById(id: any): Promise<Rooms>;
    sendMessage(id: any, message: any): Promise<void>;
}
