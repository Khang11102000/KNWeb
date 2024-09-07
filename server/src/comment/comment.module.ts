import { Module } from '@nestjs/common';

import { CommentController } from './comment.controller';

import { CommentService } from './comment.service';
import { DocumentCommentPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { FilesModule } from '../files/files.module';

// <database-block>
const infrastructurePersistenceModule =  DocumentCommentPersistenceModule;
// </database-block>

@Module({
  imports: [infrastructurePersistenceModule, FilesModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService, infrastructurePersistenceModule],
})
export class CommentModule {}
