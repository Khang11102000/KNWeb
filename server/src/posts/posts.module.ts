import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller';

import { PostsService } from './posts.service';
import { DocumentPostPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CommentModule } from 'src/comment/comment.module';
import { CommentService } from 'src/comment/comment.service';

// <database-block>
const infrastructurePersistenceModule =  DocumentPostPersistenceModule;
// </database-block>

@Module({
  imports: [infrastructurePersistenceModule, CommentModule],
  controllers: [PostsController],
  providers: [PostsService, CommentService],
  exports: [PostsService, infrastructurePersistenceModule],
})
export class PostsModule {}
