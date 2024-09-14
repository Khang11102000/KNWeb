import { User } from 'src/users/domain/user';
import { Comment } from '../../../../domain/comment';
import { CommentSchemaClass } from '../entities/comment.schema';
import { UserSchemaClass } from 'src/users/infrastructure/persistence/document/entities/user.schema';

export class CommentMapper {
  static toDomain(raw: CommentSchemaClass): Comment {
    const domainEntity = new Comment();
    domainEntity.id = raw._id.toString();
    domainEntity.content = raw.content;
    domainEntity.postId = raw.postId;
    domainEntity.commentId = raw.commentId
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    if (raw.commenter) {
      domainEntity.commenter = new User();
      domainEntity.commenter.id = raw.commenter._id.toString();
      domainEntity.commenter.email = raw.commenter.email
      domainEntity.commenter.firstName = raw.commenter.lastName
      domainEntity.commenter.lastName = raw.commenter.firstName
      domainEntity.commenter.photo = raw.commenter.photo
    }
    return domainEntity;
  }

  static toPersistence(domainEntity: Comment): CommentSchemaClass {
    const persistenceSchema = new CommentSchemaClass();
    if (domainEntity.id && typeof domainEntity.id === 'string') {
      persistenceSchema._id = domainEntity.id;
    }
    if (domainEntity.commenter) {
      persistenceSchema.commenter = new UserSchemaClass();
      if (domainEntity.commenter.id && typeof domainEntity.commenter.id === 'string') {
        persistenceSchema.commenter._id = domainEntity.commenter.id
      }
      persistenceSchema.commenter.email = domainEntity.commenter.email
      persistenceSchema.commenter.firstName = domainEntity.commenter.lastName
      persistenceSchema.commenter.lastName = domainEntity.commenter.firstName
      persistenceSchema.commenter.photo = domainEntity.commenter.photo
    }
    persistenceSchema.postId = domainEntity.postId;
    persistenceSchema.commentId = domainEntity.commentId;
    persistenceSchema.content = domainEntity.content;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    persistenceSchema.deletedAt = domainEntity.deletedAt;
    return persistenceSchema;
  }
}
