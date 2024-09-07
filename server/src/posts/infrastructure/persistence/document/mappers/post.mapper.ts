import { Posts } from '../../../../domain/post';
import { PostSchemaClass } from '../entities/post.schema';

export class PostMapper {
  static toDomain(raw: PostSchemaClass): Posts {
    const domainEntity = new Posts();
    domainEntity.id = raw._id.toString();
    domainEntity.content = raw.content;
    domainEntity.photo = raw.photo;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Posts): PostSchemaClass {


    const persistenceSchema = new PostSchemaClass();
    if (domainEntity.id && typeof domainEntity.id === 'string') {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.content = domainEntity.content;
    persistenceSchema.photo = domainEntity.photo;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    persistenceSchema.deletedAt = domainEntity.deletedAt;
    return persistenceSchema;
  }
}
