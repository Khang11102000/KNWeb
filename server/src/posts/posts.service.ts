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

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostRepository,
  ) {}

  //Search
  // getNewFeed(id: Posts['id']): Promise<NullableType<Posts>> {
  //   return this.postsRepository.findById(id);
  // }
  findById(id: Posts['id']): Promise<NullableType<Posts>> {
    return this.postsRepository.findById(id);
  }

  findByUserInfo(user: Posts['poster']): Promise<NullableType<Posts>> {
    return this.postsRepository.findByUserInfo(user);
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
    if (!clonedPayload.poster.role?.id) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          status: 'dataErrors',
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
