import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChatRepository } from '../../chat.repository';
import { Chat } from 'src/Chats/domain/Chat';
import { ChatSchemaClass } from '../entities/chat.schema';
import { CreateChatDto } from 'src/chats/dto/create-chat.dto';
import { GetChatDto } from 'src/chats/dto/get-chat.dto';
@Injectable()
export class ChatDocumentRepository implements ChatRepository {

  constructor(
    @InjectModel(ChatSchemaClass.name)
    private readonly chatModel: Model<ChatSchemaClass>,

  ) { }
    // create(data: Omit<Chat, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>): Promise<Chat> {
    //     throw new Error('Method not implemented.');
    // }
    async create(senderId: string, createChatDto: CreateChatDto) {
      const createdChat = new this.chatModel({
        ...createChatDto,
        sender_id: senderId,
      });
      return await createdChat.save();
    }
  
    async findAll(roomId: string, getChatDto: GetChatDto) {
      const query = {
        room_id: roomId,
      };
  
      if (getChatDto.last_id) {
        query['_id'] = { $lt: getChatDto.last_id };
      }
  
      return await this.chatModel.find(query).sort({ createdAt: -1 }).limit(getChatDto.limit);
    }

}
