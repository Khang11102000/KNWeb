import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { GetChatDto } from './dto/get-chat.dto';
import { ChatRepository } from './infrastructure/chat.repository';

@Injectable()
export class ChatService {

  constructor(
    private readonly chatRepository: ChatRepository,
  ) { }

  async create(senderId: string, createChatDto: CreateChatDto) {
    return await this.chatRepository.create(senderId, createChatDto)
  }

  async findAll(roomId: string, getChatDto: GetChatDto) {
    return await this.chatRepository.findAll(roomId, getChatDto);
  }
}
