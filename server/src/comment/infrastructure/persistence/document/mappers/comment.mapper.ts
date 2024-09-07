import { Comment } from '../../../../domain/comment';
import { CommentSchemaClass } from '../entities/comment.schema';

export class CommentMapper {
  static toDomain(raw: CommentSchemaClass): Comment {
    const domainEntity = new Comment();
    domainEntity.id = raw._id.toString();
    domainEntity.content = raw.content;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Comment): CommentSchemaClass {
    const persistenceSchema = new CommentSchemaClass();
    if (domainEntity.id && typeof domainEntity.id === 'string') {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    persistenceSchema.deletedAt = domainEntity.deletedAt;
    return persistenceSchema;
  }
}
