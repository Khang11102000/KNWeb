import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';

import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../utils/types/nullable.type';
// import { QueryPostDto } from './dto/query-post.dto';
import { Comment } from './domain/comment';
import { CommentService } from './comment.service';
import { RolesGuard } from '../roles/roles.guard';
import { infinityPagination } from '../utils/infinity-pagination';

@ApiBearerAuth()
@Roles(RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Comment')
@Controller({
  path: 'comment',
  version: '1',
})
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @ApiCreatedResponse({
    type: Post,
  })
  @SerializeOptions({
    groups: ['user'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  @ApiOkResponse({
    type: Post,
  })
  @SerializeOptions({
    groups: ['user'],
  })
  //Find
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findById(@Param('id') id: Comment['id']): Promise<NullableType<Comment>> {
    return this.commentService.findById(id);
  }

  @Get('post-or-comment/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findByPostOrComment(@Param('id') id: Comment['id']): Promise<NullableType<Comment[]>> {
    return this.commentService.findByPostOrComment(id);
  }

  @ApiOkResponse({
    type: Post,
  })
  @SerializeOptions({
    groups: ['user'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  // update(
  //   @Param('id') id: Comment['id'],
  //   @Body() updateCommentDto: UpdateCommentDto,
  // ): Promise<Comment | null> {
  //   return this.commentService.update(id, updateCommentDto);
  // }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Comment['id']): Promise<void> {
    return this.commentService.remove(id);
  }
}
