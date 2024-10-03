import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './domain/room';
import { RoomRepository } from './infrastructure/room.repository';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class RoomsService {
    constructor(
        private readonly roomRepository: RoomRepository,
    ) { }

    async create(createRoomDto: CreateRoomDto) {
        return await this.roomRepository.create(createRoomDto);
    }

    async getByRequest(userId: string) {
        return await this.roomRepository.getByRequest(userId);
    }
    async getPersonalRoomByRequest(userId: string, friendId: string): Promise<NullableType<Room>> {
        return await this.roomRepository.getPersonalRoomByRequest(userId, friendId);
    }
}
