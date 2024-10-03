import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema, ChatSchemaClass } from './entities/chat.schema';
import { ChatRepository } from '../chat.repository';
import { ChatDocumentRepository } from './repositories/chat.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatSchemaClass.name, schema: ChatSchema },
    ]),
  ],
  providers: [
    {
      provide: ChatRepository,
      useClass: ChatDocumentRepository,
    },
  ],
  exports: [ChatRepository],
})
export class DocumentChatPersistenceModule {}
