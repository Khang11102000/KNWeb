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
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
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
import { Posts } from './domain/post';
import { PostsService } from './posts.service';
import { RolesGuard } from '../roles/roles.guard';
import { infinityPagination } from '../utils/infinity-pagination';

@ApiBearerAuth()
@Roles(RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Posts')
@Controller({
  path: 'posts',
  version: '1',
})
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiCreatedResponse({
    type: Post,
  })
  @SerializeOptions({
    groups: ['user'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreatePostDto): Promise<Posts> {
    return this.postsService.create(createProfileDto);
  }

  @ApiOkResponse({
    type: InfinityPaginationResponse(Posts),
  })
  @SerializeOptions({
    groups: ['user'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  // async findAll(
  //   @Query() query: QueryPostDto,
  // ): Promise<InfinityPaginationResponseDto<Post>> {
  //   const page = query?.page ?? 1;
  //   let limit = query?.limit ?? 10;
  //   if (limit > 50) {
  //     limit = 50;
  //   }

  //   return infinityPagination(
  //     await this.postsService.findManyWithPagination({
  //       filterOptions: query?.filters,
  //       sortOptions: query?.sort,
  //       paginationOptions: {
  //         page,
  //         limit,
  //       },
  //     }),
  //     { page, limit },
  //   );
  // }

  @ApiOkResponse({
    type: Post,
  })
  @SerializeOptions({
    groups: ['user'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Posts['id']): Promise<NullableType<Posts>> {
    return this.postsService.findById(id);
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
  update(
    @Param('id') id: Posts['id'],
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<Posts | null> {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Posts['id']): Promise<void> {
    return this.postsService.remove(id);
  }
}
