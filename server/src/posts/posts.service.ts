import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { NullableType } from '../utils/types/nullable.type';
// import { FilterPostDto, SortPostDto } from './dto/query-post.dto';
import { PostRepository } from './infrastructure/persistence/post.repository';
import { Posts } from './domain/post';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { CommentRepository } from 'src/comment/infrastructure/persistence/comment.repository';
import { User } from 'src/users/domain/user';
import { FilterUserDto, SortUserDto } from 'src/users/dto/query-user.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  //Find
  findById(id: Posts['id']): Promise<NullableType<Posts>> {
    return this.postsRepository.findById(id);
  }
  async findByUserId(
    userId: Posts['poster']['id'],
  ): Promise<NullableType<Posts[]>> {
    const listPost = await this.postsRepository.findByUserId(userId);
    listPost?.map(async (pt, i) => {
      const comments = await this.commentRepository.findByPostOrComment(pt.id);
      if (comments && comments.length > 0) {
        pt.comments = [...comments];
      }
      return pt;
    });
    return listPost;
  }
  async findByUserIdWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  },
    userId: Posts['poster']['id'],
  ): Promise<Posts[]> {
    const listPost = await this.postsRepository.findByUserIdWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    }, userId);
    listPost?.map(async (pt, i) => {
      const comments = await this.commentRepository.findByPostOrComment(pt.id);
      if (comments && comments.length > 0) {
        pt.comments = [...comments];
      }
      return pt;
    });
    return listPost;
  }
  async findByKeyword(keyword: any): Promise<NullableType<Posts[]>> {
    const listPost = await this.postsRepository.findByKeyword(keyword);
    listPost?.map(async (pt, i) => {
      const comments = await this.commentRepository.findByPostOrComment(pt.id);
      if (comments && comments.length > 0) {
        pt.comments = [...comments];
      }
      return pt;
    });
    return listPost;
  }
  async findByKeywordWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }, keyword: any): Promise<Posts[]> {
    const listPost = await this.postsRepository.findByKeywordWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    }, keyword);
    listPost?.map(async (pt, i) => {
      const comments = await this.commentRepository.findByPostOrComment(pt.id);
      if (comments && comments.length > 0) {
        pt.comments = [...comments];
      }
      return pt;
    });
    return listPost;
  }
  async findNewFeed(
    userInfo: User,
    token?: string,
  ): Promise<NullableType<Posts[]>> {
    const listPost = await this.postsRepository.findNewFeed(userInfo, token);
    return listPost;
  }
  findNewFeedWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  },
    userInfo: User,
    token?: string,
  ): Promise<Posts[]> {
    return this.postsRepository.findNewFeedWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    }, userInfo, token);
  }

  async create(createPostDto: CreatePostDto): Promise<Posts> {
    const clonedPayload = {
      ...createPostDto,
    };
    if (!clonedPayload.content && !clonedPayload.photo) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          status: 'noContent',
        },
      });
    }
    return this.postsRepository.create(clonedPayload);
  }

  async update(
    id: Posts['id'],
    payload: DeepPartial<Posts>,
  ): Promise<Posts | null> {
    const clonedPayload = { ...payload };

    return this.postsRepository.update(id, clonedPayload);
  }

  async remove(id: Posts['id']): Promise<void> {
    await this.postsRepository.remove(id);
  }
}
