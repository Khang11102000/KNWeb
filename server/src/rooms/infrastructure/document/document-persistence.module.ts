import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema, RoomSchemaClass } from './entities/room.schema';
import { RoomRepository } from '../room.repository';
import { RoomDocumentRepository } from './repositories/room.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoomSchemaClass.name, schema: RoomSchema },
    ]),
  ],
  providers: [
    {
      provide: RoomRepository,
      useClass: RoomDocumentRepository,
    },
  ],
  exports: [RoomRepository],
})
export class DocumentRoomPersistenceModule {}
