import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { FilesModule } from '../files/files.module';
import { DocumentUserPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

// <database-block>
const infrastructurePersistenceModule = DocumentUserPersistenceModule
// </database-block>

@Module({
  imports: [infrastructurePersistenceModule, FilesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, infrastructurePersistenceModule],
})
export class UsersModule {}
