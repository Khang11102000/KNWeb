import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsOptional } from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';


export class UpdateCommentDto extends PartialType(CreateCommentDto) {

  @ApiPropertyOptional({ example: 'No Content', type: String })
  content: string | null;

}
