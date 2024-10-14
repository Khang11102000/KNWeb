import { UserMapper } from '../../../../users/infrastructure/persistence/document/mappers/user.mapper';
import { Room } from "src/rooms/domain/room";
import { RoomSchemaClass } from "../entities/room.schema";

export class RoomMapper {
  static toDomain(raw: RoomSchemaClass): Room {
    const domainEntity = new Room();
    domainEntity.id = raw._id.toString();
    domainEntity.name = raw.name;
    domainEntity.type = raw.type;
    domainEntity.avatar = raw.avatar;
    domainEntity.recentActive = raw.recentActive;


    if (raw.members) {
      domainEntity.members = [...raw.members as any];
    }
    return domainEntity;
  }
  static toPersistence(domainEntity: Room): RoomSchemaClass {
    const roomSchema = new RoomSchemaClass();
    roomSchema._id = domainEntity.id.toString();
    const roomEntity = new RoomSchemaClass();
    if (domainEntity.id && typeof domainEntity.id === 'string') {
      roomEntity._id = domainEntity.id;
    }
    roomEntity.name = domainEntity.name;
    roomEntity.type = domainEntity.type;
    roomEntity.recentActive = domainEntity.recentActive;

    return roomEntity;
  }
}
