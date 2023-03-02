import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';

@WebSocketGateway()
export class RoomsGateway {
  @WebSocketServer() public server: Server;

  constructor(private roomsService: RoomsService) {}

  @SubscribeMessage('createChatRoom')
  async createChatRoom(socket: Socket) {
    const result = await this.roomsService.createChatRoom();
    console.log(result);
    console.log('Hello world!', socket.id);
  }

  @SubscribeMessage('getChatRooms')
  async getChatRooms(socket: Socket) {
    const result = await this.roomsService.getChatRooms();
    socket.emit('getChatRooms', result);
    console.log(result);
  }

  @SubscribeMessage('joinChatRomm')
  async joinChatRoom(client: Socket, data: any) {
    client.join(data[0]);
    client.emit('message');
    console.log(client.data);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: string) {
    console.log(message);
    this.server.emit('message', message);
  }
}
