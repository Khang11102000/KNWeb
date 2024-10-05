
import { Room } from '../domain/room';
import { CreateRoomDto } from '../dto/create-room.dto';

export abstract class RoomRepository {
  abstract create(createRoomDto: CreateRoomDto);
  abstract getByRequest(userId: string);
  abstract getPersonalRoomByRequest(userId: string, friendId: string)

  
}
