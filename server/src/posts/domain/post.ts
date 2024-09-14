import { Status } from '../../statuses/domain/status';
import { ApiProperty } from '@nestjs/swagger';
import databaseConfig from '../../database/config/database.config';
import { DatabaseConfig } from '../../database/config/database-config.type';
import { User } from 'src/users/domain/user';
import { Comment } from 'src/comment/domain/comment';

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>

export class Posts {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: () => User ,
  })
  poster: User;

  @ApiProperty({
    type: String,
    example: 'No Content',
  })
  content: string | null;

  @ApiProperty({
    type: String,
  })
  photo: string | null;

  @ApiProperty({
    type: Number,
  })
  status: number;

  @ApiProperty({
    type: Array<Comment>,
  })
  comments?: Comment[];
  
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
