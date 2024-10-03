import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { ChatModule } from 'src/chats/chat.module';
import { DocumentRoomPersistenceModule } from './infrastructure/document/document-persistence.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

const infrastructurePersistenceModule = DocumentRoomPersistenceModule;

@Module({
  imports: [
    infrastructurePersistenceModule,
    ChatModule

  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule { }
