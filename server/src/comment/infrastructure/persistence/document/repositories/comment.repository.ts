import { Injectable } from '@nestjs/common';

import { NullableType } from '../../../../../utils/types/nullable.type';
import { Comment } from '../../../../domain/comment';
import { CommentRepository } from '../../comment.repository';
import { CommentSchemaClass } from '../entities/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CommentMapper } from '../mappers/comment.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CommentDocumentRepository implements CommentRepository {
  constructor(
    @InjectModel(CommentSchemaClass.name)
    private readonly commentModel: Model<CommentSchemaClass>,
  ) { }

  async create(data: Comment): Promise<Comment> {
    const persistenceModel = CommentMapper.toPersistence(data);
    const createdComment = new this.commentModel(persistenceModel);
    const commentObject = await createdComment.save();
    return CommentMapper.toDomain(commentObject);
  }


  async findById(id: Comment['id']): Promise<NullableType<Comment>> {
    const commentObject = await this.commentModel.findById(id);
    return commentObject ? CommentMapper.toDomain(commentObject) : null;
  }
  async findByPostOrComment(id: Comment['id']): Promise<NullableType<Comment[]>> {
    // var ObjectId = require('mongoose').Types.ObjectId;

    // if (typeof (id) === 'string') {
    //   var objId = new ObjectId((id.length < 12) ? "123456789012" : id);
    //   const commentObject = await this.commentModel.find(
    //     { $or: [{ 'postId': id }, { 'commentId': id }] }
    //   )
    // }
    const commentObjects = await this.commentModel.find(
      { $or: [{ 'postId': id }, { 'commentId': id }] }
    );
    // return commentObject ? CommentMapper.toDomain(commentObject) : null;
    return commentObjects.map((commentObject) => CommentMapper.toDomain(commentObject));

  }


  async update(id: Comment['id'], payload: Partial<Comment>): Promise<Comment | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const post = await this.commentModel.findOne(filter);

    if (!post) {
      return null;
    }

    const commentObject = await this.commentModel.findOneAndUpdate(
      filter,
      CommentMapper.toPersistence({
        ...CommentMapper.toDomain(post),
        ...clonedPayload,
      }),
      { new: true },
    );

    return commentObject ? CommentMapper.toDomain(commentObject) : null;
  }

  async remove(id: Comment['id']): Promise<void> {
    await this.commentModel.deleteOne({
      _id: id.toString(),
    });
  }
}
