import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';



export class UpdateCommentDto extends PartialType(CreateCommentDto) {

  @ApiPropertyOptional({ example: 'No Content', type: String })
  content: string;

}
