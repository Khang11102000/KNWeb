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
  @ApiProperty({ type: idType })
  @IsOptional()
  postId: number | string;;
  @IsOptional()
  @ApiProperty({ type: idType })
  commentId: number | string;
  @IsNotEmpty()
  @ApiPropertyOptional({ type: () => UserDto })
  @Type(() => UserDto)
  commenter: UserDto;
  @ApiProperty({ example: 'This is comment', type: String })
  @IsNotEmpty()
  content: string;
}
