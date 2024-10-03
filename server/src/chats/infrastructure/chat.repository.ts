
import { NullableType } from 'src/utils/types/nullable.type';
import { Chat } from '../domain/chat';
import { CreateChatDto } from '../dto/create-chat.dto';
import { GetChatDto } from '../dto/get-chat.dto';

export abstract class ChatRepository {
  abstract create(senderId: string, createChatDto: CreateChatDto);
  abstract findAll(roomId: string, getChatDto: GetChatDto): Promise<NullableType<Chat[]>>

}
