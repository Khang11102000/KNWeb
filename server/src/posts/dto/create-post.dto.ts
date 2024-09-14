import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  // decorators here
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';
import { Comment } from 'src/comment/domain/comment';

export class CreatePostDto {
  @IsNotEmpty()
  @ApiPropertyOptional({ type: () => UserDto })
  @Type(() => UserDto)
  poster: UserDto;

  @ApiProperty({ example: `This is post's content`, type: String })
  @IsOptional()
  content: string | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  photo: string | null;
  status: number;
}
