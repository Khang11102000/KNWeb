import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { NullableType } from '../utils/types/nullable.type';
// import { FilterPostDto, SortPostDto } from './dto/query-post.dto';
import { CommentRepository } from './infrastructure/persistence/comment.repository';
import { Comment } from './domain/comment';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const clonedPayload = {
      ...createCommentDto,
    };


    return this.commentRepository.create(clonedPayload);
  }


  findById(id: Comment['id']): Promise<NullableType<Comment>> {
    return this.commentRepository.findById(id);
  }
  findByPostOrComment(id: Comment['id']): Promise<NullableType<Comment>> {
    return this.commentRepository.findById(id);
  }
  async update(
    id: Comment['id'],
    payload: DeepPartial<Comment>,
  ): Promise<Comment | null> {
    const clonedPayload = { ...payload };

    return this.commentRepository.update(id, clonedPayload);
  }

  async remove(id: Comment['id']): Promise<void> {
    await this.commentRepository.remove(id);
  }
}
