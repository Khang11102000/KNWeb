import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  // decorators here
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import databaseConfig from 'src/database/config/database.config';
import { DatabaseConfig } from 'src/database/config/database-config.type';
import { UserDto } from 'src/users/dto/user.dto';

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>
export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty({ type: idType })
  postId: string | number;
  @ApiProperty({ type: idType })
  commentId: string | number;
  // @ApiProperty({ type: String })
  // postAuid: string | null;
  // @ApiProperty({ type: String })
  // commentAuid: string | null;

  @IsNotEmpty()
  @ApiPropertyOptional({ type: UserDto })
  @Type(() => UserDto)
  commenter: UserDto;

  @ApiProperty({ example: 'This is comment', type: String })
  @IsNotEmpty()
  content: string | null;
  comments: string[];
}
