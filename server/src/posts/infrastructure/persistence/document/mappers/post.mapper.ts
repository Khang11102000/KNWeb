import { UserSchemaClass } from 'src/users/infrastructure/persistence/document/entities/user.schema';
import { Posts } from '../../../../domain/post';
import { PostSchemaClass } from '../entities/post.schema';
import { User } from 'src/users/domain/user';

export class PostMapper {
  static toDomain(raw: PostSchemaClass): Posts {
    const domainEntity = new Posts();
    domainEntity.id = raw._id.toString();
    domainEntity.content = raw.content;
    domainEntity.photo = raw.photo;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

    if (raw.poster) {
      domainEntity.poster = new User();
      domainEntity.poster.id = raw.poster._id.toString();
      domainEntity.poster.email = raw.poster.email
      domainEntity.poster.firstName = raw.poster.lastName
      domainEntity.poster.lastName = raw.poster.firstName
      domainEntity.poster.photo = raw.poster.photo
    }
    if (raw.comments && raw.comments.length > 0) {
      raw.comments.map((cmt, i) => {
        if (domainEntity.comments && domainEntity.comments.length > 0) {
          domainEntity.comments[i].commentId = cmt.commentId
          domainEntity.comments[i].postId = cmt.postId
          domainEntity.comments[i].content = cmt.content
          domainEntity.comments[i].createdAt = cmt.createdAt
          domainEntity.comments[i].updatedAt = cmt.updatedAt
          domainEntity.comments[i].commenter = new User();
          domainEntity.comments[i].commenter.firstName = cmt.commenter.firstName
          domainEntity.comments[i].commenter.lastName = cmt.commenter.lastName
          domainEntity.comments[i].commenter.photo = cmt.commenter.photo
        }
      })
    }
    return domainEntity;
  }

  static toPersistence(domainEntity: Posts): PostSchemaClass {
    const persistenceSchema = new PostSchemaClass();
    if (domainEntity.id && typeof domainEntity.id === 'string') {
      persistenceSchema._id = domainEntity.id;
    }

    if (domainEntity.poster) {
      persistenceSchema.poster = new UserSchemaClass();
      if (domainEntity.poster.id && typeof domainEntity.poster.id === 'string') {
        persistenceSchema.poster._id = domainEntity.poster.id
      }
      persistenceSchema.poster.email = domainEntity.poster.email
      persistenceSchema.poster.firstName = domainEntity.poster.lastName
      persistenceSchema.poster.lastName = domainEntity.poster.firstName
      persistenceSchema.poster.photo = domainEntity.poster.photo
    }
    persistenceSchema.content = domainEntity.content;
    persistenceSchema.photo = domainEntity.photo;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    persistenceSchema.deletedAt = domainEntity.deletedAt;
    return persistenceSchema;
  }
}
