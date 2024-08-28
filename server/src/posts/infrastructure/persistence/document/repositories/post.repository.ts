import { Injectable } from '@nestjs/common';

import { NullableType } from '../../../../../utils/types/nullable.type';
import { Posts } from '../../../../domain/post';
import { PostRepository } from '../../post.repository';
import { PostSchemaClass } from '../entities/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PostMapper } from '../mappers/post.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PostsDocumentRepository implements PostRepository {
  constructor(
    @InjectModel(PostSchemaClass.name)
    private readonly postsModel: Model<PostSchemaClass>,
  ) {}

  async create(data: Posts): Promise<Posts> {
    const persistenceModel = PostMapper.toPersistence(data);
    const createdPost = new this.postsModel(persistenceModel);
    const postObject = await createdPost.save();
    return PostMapper.toDomain(postObject);
  }

  // async findManyWithPagination({
  //   paginationOptions,
  // }: {
  //   paginationOptions: IPaginationOptions;
  // }): Promise<Posts[]> {
  //   const where: FilterQuery<PostSchemaClass> = {};
  //   if (filterOptions?.roles?.length) {
  //     where['role._id'] = {
  //       $in: filterOptions.roles.map((role) => role.id.toString()),
  //     };
  //   }

  //   const postObjects = await this.postsModel
  //     .find(where)
  //     .sort(
  //       sortOptions?.reduce(
  //         (accumulator, sort) => ({
  //           ...accumulator,
  //           [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
  //             sort.order.toUpperCase() === 'ASC' ? 1 : -1,
  //         }),
  //         {},
  //       ),
  //     )
  //     .skip((paginationOptions.page - 1) * paginationOptions.limit)
  //     .limit(paginationOptions.limit);

  //   return postObjects.map((postObject) => PostMapper.toDomain(postObject));
  // }

  async findById(id: Posts['id']): Promise<NullableType<Posts>> {
    const postObject = await this.postsModel.findById(id);
    return postObject ? PostMapper.toDomain(postObject) : null;
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
