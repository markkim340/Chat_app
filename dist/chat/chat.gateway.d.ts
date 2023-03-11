import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    server: Server;
    constructor(chatService: ChatService);
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    logIn(data: string, client: Socket): Promise<void>;
    joinChatRooms(client: Socket, data: any): Promise<void>;
    handleMessage(data: any): Promise<void>;
}
