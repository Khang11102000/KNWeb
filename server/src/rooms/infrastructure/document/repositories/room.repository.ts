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
  async updateActive(id: string) {
    const roomObject = await this.roomModel.findOneAndUpdate({ _id: id }, { $set: { recentActive: Date.now() } });
    return roomObject ? RoomMapper.toDomain(roomObject) : null;
  }
  async getById(roomId: string): Promise<NullableType<Room>> {
    const roomObject = await this.roomModel.findOne({ _id: roomId });
    return roomObject ? RoomMapper.toDomain(roomObject) : null
  }
  async create(createRoomDto: CreateRoomDto) {
    try {
      const createdRoom = new this.roomModel(createRoomDto);
      const roomObject = await createdRoom.save()
      return RoomMapper.toDomain(roomObject);
    } catch (error) {
      console.log("Room Repository Error:", error)
    }
  }

  async getByRequest(userId: string): Promise<NullableType<Room[]>> {
    const roomObjects = await this.roomModel
      .find({ members: userId })
      .sort({ recentActive: -1 })
      .exec()
    return roomObjects.map((roomObject) => RoomMapper.toDomain(roomObject))
  }
  async getPersonalRoomByRequest(userId: string, friendId: string): Promise<NullableType<Room>> {
    const roomObject = await this.roomModel.findOne({
      type: RoomType.PERSONAL,
      $and: [{ members: userId }, { members: friendId }]
    });
    return roomObject ? RoomMapper.toDomain(roomObject) : null
  }

}
