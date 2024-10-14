import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './domain/room';
import { RoomRepository } from './infrastructure/room.repository';
import { NullableType } from 'src/utils/types/nullable.type';
import { UserRepository } from 'src/users/infrastructure/persistence/user.repository';

@Injectable()
export class RoomsService {
    constructor(
        private readonly roomRepository: RoomRepository,
        private readonly userRepository: UserRepository,

    ) { }

    async create(createRoomDto: CreateRoomDto) {
        return await this.roomRepository.create(createRoomDto);
    }

    async getByRequest(userId: string) {
        const rooms = await this.roomRepository.getByRequest(userId);
        if (rooms && rooms.length > 0) {
            for (const room of rooms) {
                if (room.members && room.members.length > 0) {
                    const user = await this.userRepository.findById(room.members.filter((m) => m !== userId)[0])
                    room.avatar = user?.photo || "";
                    room.name = user?.firstName + ' ' + user?.lastName
                }
            }
        }

        return rooms;
    }
    async getById(id: string, sender: string) {
        const room = await this.roomRepository.getById(id)
        if (room && room.members && room.members.length > 0) {
            const user = await this.userRepository.findById(room.members.filter((m) => m !== sender)[0])
            room.avatar = user?.photo || "";
            room.name = user?.firstName + ' ' + user?.lastName
        }
        return room;
    }
    async updateActive(id: string) {
        return await this.roomRepository.updateActive(id);
    }
    async getPersonalRoomByRequest(userId: string, friendId: string): Promise<NullableType<Room>> {
        return await this.roomRepository.getPersonalRoomByRequest(userId, friendId);
    }
}
