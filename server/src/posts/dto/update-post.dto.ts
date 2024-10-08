import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsOptional } from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';


export class UpdatePostDto extends PartialType(CreatePostDto) {

  @ApiPropertyOptional({ example: 'No Content', type: String })
  content: string | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  photo?: string | null;
}
