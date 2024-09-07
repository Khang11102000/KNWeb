import { FileType } from '../../files/domain/file';
import { Status } from '../../statuses/domain/status';
import { ApiProperty } from '@nestjs/swagger';
import databaseConfig from '../../database/config/database.config';
import { DatabaseConfig } from '../../database/config/database-config.type';
import { User } from 'src/users/domain/user';

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>

export class Comment {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: idType,
  })
  postId?: number | string;

  @ApiProperty({
    type: idType,
  })
  commentId?: number | string;
  // @ApiProperty({
  //   type: String,
  // })
  // auid: string;

  // @ApiProperty({
  //   type: String,
  // })
  // postAuid: string;

  // @ApiProperty({
  //   type: String,
  // })
  // commentAuid: string;

  @ApiProperty({
    type: () => User,
  })
  commenter: User;

  @ApiProperty({
    type: String,
    example: 'No Content',
  })
  content: string | null;

  @ApiProperty({
    type: Array
  })
  comments: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
