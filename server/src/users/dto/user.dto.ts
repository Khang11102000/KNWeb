import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { User } from '../domain/user';
import { FileType } from 'src/files/domain/file';
import { Role } from 'src/roles/domain/role';
import { Status } from 'src/statuses/domain/status';
import databaseConfig from 'src/database/config/database.config';
import { DatabaseConfig } from 'src/database/config/database-config.type';
import { Type } from 'class-transformer';
import { StatusDto } from 'src/statuses/dto/status.dto';
import { RoleDto } from 'src/roles/dto/role.dto';

// <database-block>
const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;
// </database-block>
export class UserDto implements User {
  @ApiProperty({
    type: idType,
  })
  id: number | string;
  @ApiProperty({
    type: String
  })
  email: string | null;
  password?: string | undefined;
  previousPassword?: string | undefined;
  provider: string;
  socialId?: string | null | undefined;
  @ApiProperty({
    type: String
  })
  firstName: string | null;
  @ApiProperty({
    type: String
  })
  lastName: string | null;
  @ApiProperty({
    type: String
  })
  photo?: string;
  // @ApiPropertyOptional({ type: RoleDto })
  // @IsOptional()
  // @Type(() => RoleDto)
  role?: Role | null | undefined;
  // @ApiPropertyOptional({ type: StatusDto })
  // @IsOptional()
  // @Type(() => StatusDto)
  status?: Status | undefined;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

}
