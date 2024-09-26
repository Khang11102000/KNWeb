
import { Room } from '../domain/room';
import { CreateRoomDto } from '../dto/create-room.dto';

export abstract class RoomRepository {
  abstract create(userId: string, createRoomDto: CreateRoomDto);
  abstract getByRequest(userId: string)

}
