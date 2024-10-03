import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';

// We use class-transformer in schema and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an schema entity directly in response.
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { UserSchemaClass } from 'src/users/infrastructure/persistence/document/entities/user.schema';
import { CommentSchemaClass } from 'src/comment/infrastructure/persistence/document/entities/comment.schema';

export type PostSchemaDocument = HydratedDocument<PostSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class PostSchemaClass extends EntityDocumentHelper {
  @ApiProperty({
    type: () => UserSchemaClass,
  })
  @Prop({
    type: UserSchemaClass,
  })
  // @Expose({ groups: ['me', 'admin'] })
  poster: UserSchemaClass;

  @ApiProperty({
    type: String,
    example: 'No content',
  })
  @Prop({
    type: String,
  })
  content: string | null;

  @ApiProperty({
    type: String,
  })
  @Prop({
    type: String,
  })
  photo: string | null;

  @ApiProperty()
  @Prop({ default: now })
  createdAt: Date;

  @ApiProperty()
  @Prop({ default: now })
  updatedAt: Date;

  @ApiProperty()
  @Prop()
  deletedAt: Date;

  comments?: CommentSchemaClass[];
}

export const PostSchema = SchemaFactory.createForClass(PostSchemaClass);

// PostSchema.virtual('comments').get(function () {
//   return this.comments;
// });
