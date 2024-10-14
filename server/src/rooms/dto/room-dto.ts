import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from '../enums/room-type.enum';
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, ValidateIf } from 'class-validator';

export class RoomDto {

    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    avatar: string;

    @ApiProperty({ required: true })
    @IsArray()
    @ArrayNotEmpty()
    members: string[];

    @ApiProperty({ required: true, default: RoomType.PERSONAL })
    @IsEnum(RoomType)
    @ValidateIf(o => o.type)
    type: RoomType;

}
