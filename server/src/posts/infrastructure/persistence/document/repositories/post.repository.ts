import { Injectable } from '@nestjs/common';

import { NullableType } from '../../../../../utils/types/nullable.type';
import { Posts } from '../../../../domain/post';
import { PostRepository } from '../../post.repository';
import { PostSchemaClass } from '../entities/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostMapper } from '../mappers/post.mapper';
import { CommentSchemaClass } from 'src/comment/infrastructure/persistence/document/entities/comment.schema';

@Injectable()
export class PostsDocumentRepository implements PostRepository {
  constructor(
    @InjectModel(PostSchemaClass.name)
    private readonly postsModel: Model<PostSchemaClass>,
  ) { }
  private readonly commentModel: Model<CommentSchemaClass>

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

  async findByUserInfo(userId: Posts['poster']['id']): Promise<NullableType<Posts[]>> {
    // if (typeof (user.id) === 'string') {
    //   var objId = new ObjectId((user.id.length < 12) ? "123456789012" : user.id);
    // }
    const postObjects = await this.postsModel.find({ 'poster.id': userId }).sort({ createAt: 1 })
    // postObjects.map(async (pt, index) => {
    //   const comments = await (this.commentModel || []).find({ 'postId': pt.id })
    //   if (comments && comments.length > 0) {
    //     pt.comments = [...comments]
    //   }
    //   return pt
    // })

    return postObjects.map((postObject) => PostMapper.toDomain(postObject));
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
