"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const rooms_service_1 = require("./rooms.service");
let RoomsGateway = class RoomsGateway {
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    afterInit() {
        console.log('Init');
    }
    handleConnection(client) {
        console.log(`Connected ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Disconnected: ${client.id}`);
    }
    async logIn(data, client) {
        const [nickname, roomName] = data;
        client.join(roomName);
        this.server.emit('joinMessage', nickname, roomName);
        const joinedUsersCount = client.nsp.adapter.rooms.size - 1;
        this.server.emit('joinUserCount', joinedUsersCount);
    }
    async joinChatRooms(client, data) {
        const [nickname, roomName, roomNameToJoin] = data;
        client.leave(roomName);
        this.server.to(roomName).emit('exitMessage', nickname);
        client.join(roomNameToJoin);
        this.server
            .to(roomNameToJoin)
            .emit('joinMessage', nickname, roomNameToJoin);
    }
    async handleMessage(data) {
        const { nickname, roomName, message } = data;
        this.server.to(roomName).emit('message', nickname, message);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RoomsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('logIn'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RoomsGateway.prototype, "logIn", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], RoomsGateway.prototype, "joinChatRooms", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomsGateway.prototype, "handleMessage", null);
RoomsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsGateway);
exports.RoomsGateway = RoomsGateway;
//# sourceMappingURL=rooms.gateway.js.map