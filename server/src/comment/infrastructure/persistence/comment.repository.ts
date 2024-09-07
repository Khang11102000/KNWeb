import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Comment } from '../../domain/comment';


export abstract class CommentRepository {
  abstract create(
    data: Omit<Comment, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Comment>;

  // abstract findManyWithPagination({
  //   paginationOptions,
  // }: {
  //   paginationOptions: IPaginationOptions;
  // }): Promise<Posts[]>;

  abstract findById(id: Comment['id']): Promise<NullableType<Comment>>;

  abstract update(
    id: Comment['id'],
    payload: DeepPartial<Comment>,
  ): Promise<Comment | null>;

  abstract remove(id: Comment['id']): Promise<void>;
}
