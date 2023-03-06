import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';
export declare class RoomsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private roomsService;
    server: Server;
    constructor(roomsService: RoomsService);
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    logIn(data: string, client: Socket): Promise<void>;
    joinChatRooms(client: Socket, data: any): Promise<void>;
    handleMessage(data: any): Promise<void>;
}
