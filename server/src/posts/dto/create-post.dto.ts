import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  // decorators here
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import databaseConfig from 'src/database/config/database.config';
import { DatabaseConfig } from 'src/database/config/database-config.type';

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>
export class CreatePostDto {
  @IsNotEmpty()
  @ApiProperty({
    type: idType,
  })
  posterId: string | number;

  // @ApiPropertyOptional({
  //   type: ViewStatusDto,
  // })
  // @Type(() => ViewStatusDto)
  // viewStatus?: ViewStatusDto | null;

  @ApiProperty({ example: 'No Content', type: String })
  @IsNotEmpty()
  content: string | null;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;

  // @ApiPropertyOptional({ type: StatusDto })
  // @IsOptional()
  // @Type(() => StatusDto)
  // status?: StatusDto;

  // hash?: string | null;
}
