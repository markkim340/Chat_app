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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rooms_entity_1 = require("./rooms.entity");
let RoomsService = class RoomsService {
    constructor(roomsRepository) {
        this.roomsRepository = roomsRepository;
    }
    async createChatRoom(socketId) {
        return await this.roomsRepository.save(socketId);
    }
    async getChatRooms() {
        return await this.roomsRepository.find();
    }
    async getChatRoomById(id) {
        return await this.roomsRepository.findOneBy(id);
    }
    async sendMessage(id, message) {
        const room = await this.getChatRoomById(id);
        room.messages.push(message);
        await this.roomsRepository.save(room);
    }
};
RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rooms_entity_1.Rooms)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=rooms.service.js.map