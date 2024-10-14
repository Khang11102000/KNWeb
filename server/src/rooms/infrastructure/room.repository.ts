
import { NullableType } from 'src/utils/types/nullable.type';
import { Room } from '../domain/room';
import { CreateRoomDto } from '../dto/create-room.dto';

export abstract class RoomRepository {
  abstract create(createRoomDto: CreateRoomDto);
  abstract getByRequest(userId: string): Promise<NullableType<Room[]>>;
  abstract getById(id: string): Promise<NullableType<Room>>;
  abstract getPersonalRoomByRequest(userId: string, friendId: string)
  abstract updateActive(id: string);

  
}
