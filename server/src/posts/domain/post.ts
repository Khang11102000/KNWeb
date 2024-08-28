import { FileType } from '../../files/domain/file';
import { Status } from '../../statuses/domain/status';
import { ApiProperty } from '@nestjs/swagger';
import databaseConfig from '../../database/config/database.config';
import { DatabaseConfig } from '../../database/config/database-config.type';

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
    type: idType,
  })
  posterId: string | number;

  // @ApiProperty({
  //   type: () => ViewStatus,
  // })
  // viewStatus: ViewStatus;

  @ApiProperty({
    type: String,
    example: 'No Content',
  })
  content: string | null;

  @ApiProperty({
    type: () => FileType,
  })
  photo?: FileType | null;

  @ApiProperty({
    type: () => Status,
  })
  status?: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
