import { Injectable, Post } from '@nestjs/common';

import { NullableType } from '../../../../../utils/types/nullable.type';
import { Posts } from '../../../../domain/post';
import { PostRepository } from '../../post.repository';
import { PostSchemaClass } from '../entities/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostMapper } from '../mappers/post.mapper';
import { CommentSchemaClass } from 'src/comment/infrastructure/persistence/document/entities/comment.schema';
import { CommentService } from 'src/comment/comment.service';
import { User } from 'src/users/domain/user';
import { FilterUserDto, SortUserDto } from 'src/users/dto/query-user.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
@Injectable()
export class PostsDocumentRepository implements PostRepository {

  constructor(
    @InjectModel(PostSchemaClass.name)
    private readonly postsModel: Model<PostSchemaClass>,

  ) { }


  async create(data: Posts): Promise<Posts> {
    const persistenceModel = PostMapper.toPersistence(data);
    const createdPost = new this.postsModel(persistenceModel);
    const postObject = await createdPost.save();
    return PostMapper.toDomain(postObject);
  }

  async findById(id: Posts['id']): Promise<NullableType<Posts>> {
    const postObject = await this.postsModel.findById(id);
    return postObject ? PostMapper.toDomain(postObject) : null;
  }

  async findByUserId(userId: Posts['poster']['id']): Promise<NullableType<Posts[]>> {
    const postObjects = await this.postsModel.find({ 'poster._id': userId }).sort({ createAt: 1 })
    return postObjects.map((postObject) => PostMapper.toDomain(postObject));
  }
  async findByUserIdWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }, userId: Posts['poster']['id']): Promise<Posts[]> {
    const postsObjects = await this.postsModel
      .find({ 'poster._id': userId })
      .sort({ createAt: 1 })
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);
    return postsObjects.map((postObject) => PostMapper.toDomain(postObject));
  }
  async findByKeyword(keyword: string): Promise<NullableType<Posts[]>> {
    var regex = new RegExp(keyword, 'i');
    const postObject = await this.postsModel.find({
      $or: [
        { 'content': regex },
        { 'poster.firstName': regex },
        { 'poster.lastName': regex }
      ]
    }).sort({ createAt: 1 });

    return postObject.map((postObject) => PostMapper.toDomain(postObject));
  }
  async findByKeywordWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }, keyword): Promise<Posts[]> {
    var regex = keyword.split(' ').map(part => new RegExp(part, 'i'));
    const postsObjects = await this.postsModel
      .find({
        $or: [
          { 'content': { $in: regex } },
          { 'poster.firstName': { $in: regex } },
          { 'poster.lastName': { $in: regex } }
        ]
      })
      .sort(
        sortOptions?.reduce(
          (accumulator, sort) => ({
            ...accumulator,
            [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
              sort.order.toUpperCase() === 'ASC' ? 1 : -1,
          }),
          {},
        ),
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return postsObjects.map((postObject) => PostMapper.toDomain(postObject));
  }
  async findNewFeed(userInfo: User, token?: string): Promise<NullableType<Posts[]>> {
    if (userInfo.friends && userInfo.friends.length > 0 || userInfo.followings && userInfo.followings.length > 0) {
      const cloneArray = [userInfo.followings].concat(userInfo.friends);
      const listPost: any[] = [];
      cloneArray.map(async (userId) => {
        const postObjects = await this.postsModel.find({ 'poster._id': userId });
        if (postObjects && postObjects.length > 0) {
          listPost.concat(postObjects)
        }
      })
      listPost.sort(this.compare);
      return listPost.map((pt) => PostMapper.toDomain(pt));
    }
    return [];
  }
  async findNewFeedWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }, userInfo: User, token?: string): Promise<Posts[]> {
    if (userInfo.friends && userInfo.friends.length > 0 || userInfo.followings && userInfo.followings.length > 0) {
      const cloneArray = [userInfo.followings].concat(userInfo.friends);
      const listPost: any[] = [];
      cloneArray.map(async (userId) => {
        const postObjects = await this.postsModel.find({ 'poster._id': userId }).sort(
          sortOptions?.reduce(
            (accumulator, sort) => ({
              ...accumulator,
              [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
                sort.order.toUpperCase() === 'ASC' ? 1 : -1,
            }),
            {},
          ),
        )
          .skip((paginationOptions.page - 1) * paginationOptions.limit)
          .limit(paginationOptions.limit);
        if (postObjects && postObjects.length > 0) {
          listPost.concat(postObjects)
        }
      })
      listPost.sort(this.compare);
      return listPost.map((pt) => PostMapper.toDomain(pt));
    }
    return [];
  }
  compare(p1: Posts, p2: Posts) {
    if (p1.createdAt < p2.createdAt) {
      return -1;
    }
    if (p1.createdAt > p2.createdAt) {
      return 1;
    }
    return 0;
  }
  async update(id: Posts['id'], payload: Partial<Posts>): Promise<Posts | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const post = await this.postsModel.findOne(filter);

    if (!post) {
      return null;
    }
    const postObject = await this.postsModel.findOneAndUpdate(
      filter,
      PostMapper.toPersistence({
        ...PostMapper.toDomain(post),
        ...clonedPayload,
      }),
      { new: true },
    );

    return postObject ? PostMapper.toDomain(postObject) : null;
  }

  async remove(id: Posts['id']): Promise<void> {
    await this.postsModel.deleteOne({
      _id: id.toString(),
    });
  }
}
