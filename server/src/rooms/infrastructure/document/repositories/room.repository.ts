import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RoomSchemaClass } from '../entities/room.schema';
import { RoomRepository } from '../../room.repository';
import { Room } from 'src/rooms/domain/room';
import { CreateRoomDto } from 'src/rooms/dto/create-room.dto';
@Injectable()
export class RoomDocumentRepository implements RoomRepository {

  constructor(
    @InjectModel(RoomSchemaClass.name)
    private readonly roomModel: Model<RoomSchemaClass>,

  ) { }
  async create(userId: string, createRoomDto: CreateRoomDto) {
    createRoomDto.members.push(userId);

    const createdRoom = new this.roomModel(createRoomDto);
    return await createdRoom.save();
  }

  async getByRequest(userId: string) {
    return await this.roomModel.find({ members: userId }).exec();
  }

}
