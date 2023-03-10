import { Rooms } from 'src/chat/Rooms.entity';
export declare class Messages {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    room: Rooms;
}
