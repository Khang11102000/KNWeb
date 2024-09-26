import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './domain/room';
import { RoomRepository } from './infrastructure/room.repository';

@Injectable()
export class RoomsService {
    constructor(
        private readonly roomRepository: RoomRepository,
    ) { }

    async create(userId: string, createRoomDto: CreateRoomDto) {
        return await this.roomRepository.create(userId, createRoomDto);
    }

    async getByRequest(userId: string) {
        return await this.roomRepository.getByRequest(userId);
    }
}
