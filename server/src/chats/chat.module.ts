import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { ChatsGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { DocumentChatPersistenceModule } from './infrastructure/document/document-persistence.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

const infrastructurePersistenceModule = DocumentChatPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule,
    PassportModule, AuthModule,

    JwtModule.register({})],
  providers: [
    ChatsGateway,
    ChatService,
  ],
  exports: [
    ChatService, infrastructurePersistenceModule
  ],
})
export class ChatModule { }
