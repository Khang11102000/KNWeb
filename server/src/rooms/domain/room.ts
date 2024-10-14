import { ApiProperty } from '@nestjs/swagger';
import databaseConfig from '../../database/config/database.config';
import { DatabaseConfig } from '../../database/config/database-config.type';
import { User } from 'src/users/domain/user';
import { Comment } from 'src/comment/domain/comment';
import { RoomType } from '../enums/room-type.enum';

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>

export class Room {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String ,
  })
  name: string;

  @ApiProperty({
    type: RoomType,
  })
  type: RoomType;

  @ApiProperty({
    type: Array<String>,
  })
  members: string[];
  @ApiProperty({
    type: String,
  })
  avatar: string;

  @ApiProperty()
  recentActive: Date;
  
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
