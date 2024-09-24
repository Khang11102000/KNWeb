import { User } from './../../../users/domain/user';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Posts } from '../../domain/post';
import { FilterUserDto, SortUserDto } from 'src/users/dto/query-user.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

export abstract class PostRepository {
  abstract create(
    data: Omit<Posts, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Posts>;

  abstract findById(id: Posts['id']): Promise<NullableType<Posts>>;
  abstract findByUserId(userId: Posts['poster']['id']): Promise<NullableType<Posts[]>>;
  abstract findByUserIdWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }, userId: any): Promise<Posts[]>;
  abstract findByKeyword(keyword: any): Promise<NullableType<Posts[]>>;
  abstract findByKeywordWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }, keyword: any): Promise<Posts[]>;
  abstract findNewFeed(userInfo: User, token?: string): Promise<NullableType<Posts[]>>;
  abstract findNewFeedWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }, userInfo: User, token?: string): Promise<Posts[]>;
  abstract update(
    id: Posts['id'],
    payload: DeepPartial<Posts>,
  ): Promise<Posts | null>;

  abstract remove(id: Posts['id']): Promise<void>;
}
