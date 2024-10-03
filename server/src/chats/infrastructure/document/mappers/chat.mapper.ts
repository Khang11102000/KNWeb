import { UserMapper } from '../../../../users/infrastructure/persistence/document/mappers/user.mapper';
import { Room } from "src/rooms/domain/room";
import { Chat } from 'src/chats/domain/chat';
import { ChatSchemaClass } from '../entities/chat.schema';

export class ChatMapper {
  static toDomain(raw: ChatSchemaClass): Chat {
    const domainEntity = new Chat();
    domainEntity.id = raw._id.toString();
    domainEntity.content = raw.content;
    domainEntity.room_id = raw.room_id.toString();
    domainEntity.sender_id = raw.sender_id.toString();
    domainEntity.createdAt = raw.createdAt;
    return domainEntity;
  }
  static toPersistence(domainEntity: Room): ChatSchemaClass {
    const roomSchema = new ChatSchemaClass();
    roomSchema._id = domainEntity.id.toString();
    const roomEntity = new ChatSchemaClass();
    if (domainEntity.id && typeof domainEntity.id === 'string') {
      roomEntity._id = domainEntity.id;
    }
    return roomEntity;
  }
}
