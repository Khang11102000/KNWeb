import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';

// We use class-transformer in schema and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an schema entity directly in response.
import { Exclude, Expose, Type } from 'class-transformer';
import { AuthProvidersEnum } from '../../../../../auth/auth-providers.enum';
import { FileSchemaClass } from '../../../../../files/infrastructure/persistence/document/entities/file.schema';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { StatusSchema } from '../../../../../statuses/infrastructure/persistence/document/entities/status.schema';
import { RoleSchema } from '../../../../../roles/infrastructure/persistence/document/entities/role.schema';
import { ApiProperty } from '@nestjs/swagger';
import databaseConfig from 'src/database/config/database.config';
import { DatabaseConfig } from 'src/database/config/database-config.type';
import { UserSchema, UserSchemaClass } from 'src/users/infrastructure/persistence/document/entities/user.schema';

export type PostSchemaDocument = HydratedDocument<PostSchemaClass>;

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>
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
}

export const PostSchema = SchemaFactory.createForClass(PostSchemaClass);

// PostSchema.virtual('previousPassword').get(function () {
//   return this.password;
// });

// PostSchema.index({ 'role._id': 1 });
