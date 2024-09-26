import { ApiProperty } from '@nestjs/swagger';
import databaseConfig from '../../database/config/database.config';
import { DatabaseConfig } from '../../database/config/database-config.type';

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>

export class Chat {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String ,
  })
  content: string;

  @ApiProperty({
    type: idType,
  })
  sender_id: string;

  @ApiProperty({
    type: idType,
  })
  room_id: string;
  
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
