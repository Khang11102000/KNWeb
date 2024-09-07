import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, CommentSchemaClass } from './entities/comment.schema';
import { CommentRepository } from '../comment.repository';
import { CommentDocumentRepository } from './repositories/comment.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentSchemaClass.name, schema: CommentSchema },
    ]),
  ],
  providers: [
    {
      provide: CommentRepository,
      useClass: CommentDocumentRepository,
    },
  ],
  exports: [CommentRepository],
})
export class DocumentCommentPersistenceModule {}
