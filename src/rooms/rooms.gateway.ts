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
export class RoomsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() public server: Server;
  constructor(private roomsService: RoomsService) {}

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

    //11
    const joinedUsersCount = this.server.engine.listenerCount('connection');
    this.server.emit('joinUserCount', joinedUsersCount);

    // //22
    // this.server.engine.prependListener('connection', (num) => {
    //   console.log(num);
    //   this.server.emit('joinUserCount', num);
    // });

    // //33
    // const numClients = io
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
    console.log('메세지내용', nickname, roomName, message);
    this.server.to(roomName).emit('message', nickname, message);
  }
}
