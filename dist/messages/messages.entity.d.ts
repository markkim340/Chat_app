import { Rooms } from 'src/rooms/rooms.entity';
export declare class Messages {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    room: Rooms;
}
