import { Injectable } from '@nestjs/common';

import { NullableType } from '../../../../../utils/types/nullable.type';
import { Posts } from '../../../../domain/post';
import { PostRepository } from '../../post.repository';
import { PostSchemaClass } from '../entities/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostMapper } from '../mappers/post.mapper';

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

  async findByUserInfo(user: Posts['poster']): Promise<NullableType<Posts>> {
    let postObject
    if (user.id) {
      postObject = await this.postsModel.findOne({ 'poster.id': user.id });
    }
    else {
      postObject = await this.postsModel.find({ 
        'poster.firstName': user.firstName, 
        'poster.lastName': user.lastName,
      });

    }
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
