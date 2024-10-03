import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RoomSchemaClass } from '../entities/room.schema';
import { RoomRepository } from '../../room.repository';
import { Room } from 'src/rooms/domain/room';
import { CreateRoomDto } from 'src/rooms/dto/create-room.dto';
import { RoomType } from 'src/rooms/enums/room-type.enum';
import { NullableType } from 'src/utils/types/nullable.type';
import { RoomMapper } from '../mappers/room.mapper';
@Injectable()
export class RoomDocumentRepository implements RoomRepository {

  constructor(
    @InjectModel(RoomSchemaClass.name)
    private readonly roomModel: Model<RoomSchemaClass>,

  ) { }
  async create(createRoomDto: CreateRoomDto) {
    // createRoomDto.members.push(userId);
    try {
      const createdRoom = new this.roomModel(createRoomDto);
      const roomObject = await createdRoom.save()
      return RoomMapper.toDomain(roomObject);
    } catch (error) {
      console.log("Room Repository Error:", error)
    }

  }

  async getByRequest(userId: string) {
    return await this.roomModel.find({ members: userId }).exec();
  }
  async getPersonalRoomByRequest(userId: string, friendId: string): Promise<NullableType<Room>> {
    const roomObject = await this.roomModel.findOne({
      type: RoomType.PERSONAL,
      $and: [{ members: userId }, { members: friendId }]
    });
    return roomObject ? RoomMapper.toDomain(roomObject) : null
  }

}
