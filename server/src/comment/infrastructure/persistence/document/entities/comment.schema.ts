import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';

import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ApiProperty } from '@nestjs/swagger';

import { UserSchemaClass } from 'src/users/infrastructure/persistence/document/entities/user.schema';
import databaseConfig from 'src/database/config/database.config';
import { DatabaseConfig } from 'src/database/config/database-config.type';

export type CommentSchemaDocument = HydratedDocument<CommentSchemaClass>;
// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>
@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
})

export class CommentSchemaClass extends EntityDocumentHelper {
  @ApiProperty({
    type: idType,
  })
  @Prop({
    type: idType,
  })
  postId: number | string;

  @ApiProperty({
    type: idType,
  })
  @Prop({
    type: idType,
  })
  commentId: number | string;
  @ApiProperty({
    type: () => UserSchemaClass,
  })
  @Prop({
    type: UserSchemaClass,
  })
  commenter: UserSchemaClass;

  @ApiProperty({
    type: String,
    example: 'No content',
  })
  @Prop({
    type: String,
  })
  content: string;

  @ApiProperty()
  @Prop({ default: now })
  createdAt: Date;

  @ApiProperty()
  @Prop({ default: now })
  updatedAt: Date;

  @ApiProperty()
  @Prop()
  deletedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(CommentSchemaClass);

