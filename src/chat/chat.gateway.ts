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
import { ChatService } from './chat.service';

const joinUsers = [];

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() public server: Server;
  constructor(private chatService: ChatService) {}

  afterInit() {
    console.log('Init');
  }

  handleConnection(client: Socket) {
    console.log(`Connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }
  // @SubscribeMessage('getChatRooms')
  // async getChatRooms(socket: Socket) {
  //   const result = await this.roomsService.getChatRooms();
  //   socket.emit('getChatRooms', result);
  //   console.log(result);
  // }

  @SubscribeMessage('logIn')
  async logIn(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    const [nickname, roomName] = data;
    client.join(roomName); // 기본 채팅방 입장
    this.server.emit('joinMessage', nickname, roomName);

    const joinedUsersCount = this.server.engine['clientsCount'];
    this.server.emit('joinUserCount', joinedUsersCount);
  }

  @SubscribeMessage('joinRoom')
  async joinChatRooms(client: Socket, data: any) {
    const [nickname, roomName, roomNameToJoin] = data;

    client.leave(roomName);
    this.server.to(roomName).emit('exitMessage', nickname);

    client.join(roomNameToJoin);
    this.server
      .to(roomNameToJoin)
      .emit('joinMessage', nickname, roomNameToJoin);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: any) {
    const { nickname, roomName, message } = data;
    this.server.to(roomName).emit('message', nickname, message);
  }
}
