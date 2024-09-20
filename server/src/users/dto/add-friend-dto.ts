import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  // decorators here
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

export class AddFriendDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  firstUserId: string;
  @ApiProperty({ type: String })
  @IsNotEmpty()
  secondUserId: string;
  @ApiProperty({ type: String })
  @IsNotEmpty()
  key: string;
}
