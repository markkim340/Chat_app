import { Messages } from 'src/messages/messages.entity';
export declare class Rooms {
    id: number;
    socketId: string;
    createdAt: Date;
    updatedAt: Date;
    messages: Messages[];
}
