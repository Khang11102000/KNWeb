import { Module } from '@nestjs/common';
import { ChatsGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { DocumentChatPersistenceModule } from './infrastructure/document/document-persistence.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { SessionModule } from 'src/session/session.module';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';

const infrastructurePersistenceModule =  DocumentChatPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule,
    PassportModule,
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
