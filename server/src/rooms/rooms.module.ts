import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { ChatModule } from 'src/chats/chat.module';
import { DocumentRoomPersistenceModule } from './infrastructure/document/document-persistence.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

const infrastructurePersistenceModule = DocumentRoomPersistenceModule;

@Module({
  imports: [
    infrastructurePersistenceModule,
    // ChatModule,
    UsersModule

  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [
    RoomsService, infrastructurePersistenceModule
  ],
})
export class RoomsModule { }
