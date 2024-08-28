import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

import { Transform, Type } from 'class-transformer';
import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { RoleDto } from '../../roles/dto/role.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class UpdatePostDto extends PartialType(CreatePostDto) {

  @ApiPropertyOptional({ example: 'No Content', type: String })
  content: string | null;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;
}
