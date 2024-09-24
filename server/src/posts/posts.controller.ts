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
import { User } from 'src/users/domain/user';
import { QueryUserDto } from 'src/users/dto/query-user.dto';

@ApiBearerAuth()
@Roles(RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Posts')
@Controller({
  path: 'posts',
  version: '1',
})
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  //Create Post
  @ApiCreatedResponse({
    type: Posts,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPostDto: CreatePostDto): Promise<Posts> {
    return this.postsService.create(createPostDto);
  }

  //Find

  //Get Post By Id
  @ApiOkResponse({
    type: Posts,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findById(@Param('id') id: Posts['id']): Promise<NullableType<Posts>> {
    return this.postsService.findById(id);
  }
  //Get Post by User Id
  @Get('user/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  findByUserId(@Param('id') id: User['id']): Promise<NullableType<Posts[]>> {
    return this.postsService.findByUserId(id);
  }
  //Get Post by User Id (Pagination)
  @SerializeOptions({
    groups: ['me'],
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: InfinityPaginationResponse(User),
  })
  //Get Post by User Id (Pagination)
  @SerializeOptions({
    groups: ['me'],
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: InfinityPaginationResponse(Posts),
  })
  @Get('user-pagination/:id')
  @HttpCode(HttpStatus.OK)
  async findByUserIdWithPagination(@Query() query: QueryUserDto,
    @Param('id') id: User['id']):
    Promise<InfinityPaginationResponseDto<Posts>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.postsService.findByUserIdWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }, id),
      { page, limit },
    );
  }
  //Get Post by Keyword
  @Get('key/:keyword')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'keyword',
    type: String,
    required: true,
  })
  findByKeyword(@Param('keyword') keyword: string): Promise<NullableType<Posts[]>> {
    return this.postsService.findByKeyword(keyword);
  }
  //Get Post by Keyword (Pagination)
  @SerializeOptions({
    groups: ['me'],
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: InfinityPaginationResponse(Posts),
  })
  @Get('key-pagination/:keyword')
  @HttpCode(HttpStatus.OK)

  async findByKeywordWithPagination(@Query() query: QueryUserDto, @Param('keyword') keyword: string)
    : Promise<InfinityPaginationResponseDto<Posts>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return infinityPagination(
      await this.postsService.findByKeywordWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }, keyword),
      { page, limit },
    );
  }
  //Get new feed
  @SerializeOptions({
    groups: ['me'],
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: InfinityPaginationResponse(Posts),
  })
  @Get('new-feed')
  findNewFeed(@Body() userInfo: User): Promise<NullableType<Posts[]>> {
    return this.postsService.findNewFeed(userInfo);
  }

  @ApiOkResponse({
    type: InfinityPaginationResponse(Posts),
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('new-feed-pagination')
  @HttpCode(HttpStatus.OK)
  async findNewFeedWithPagination(@Query() query: QueryUserDto,
    @Body() userInfo: User,
    token?: string): Promise<InfinityPaginationResponseDto<Posts>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return infinityPagination(
      await this.postsService.findNewFeedWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }, userInfo, token),
      { page, limit },
    );
  }

  @ApiOkResponse({
    type: Posts,
  })
  @SerializeOptions({
    groups: ['me'],
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
