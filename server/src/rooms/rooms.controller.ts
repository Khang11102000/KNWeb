import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetChatDto } from 'src/chats/dto/get-chat.dto';
import { ChatService } from 'src/chats/chat.service';
import { AuthGuard } from '@nestjs/passport';
import { NullableType } from 'src/utils/types/nullable.type';
import { Room } from './domain/room';
import { CreateChatDto } from 'src/chats/dto/create-chat.dto';
import { RoomDto } from './dto/room-dto';
@ApiTags('Message')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))

@Controller({
  path: 'rooms',
  version: '1',
}) export class RoomsController {

  constructor(
    private readonly roomsService: RoomsService,
    // private readonly chatsService: ChatService,
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }
  // @Post('/createChat')
  // @HttpCode(HttpStatus.CREATED)
  // createChat(@Request() req ,@Body() createChatDro: CreateChatDto) {
  //   return this.chatsService.create(req.user.id.toString(), createChatDro);
  // }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getByRequest(@Request() req) {
    return await this.roomsService.getByRequest(req.user.id.toString());
  }
  @Get('/personal:friendId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'friendId',
    type: String,
    required: true,
  })
  getPersonalRoomByRequest(@Request() req, @Param('friendId') friendId: string): Promise<NullableType<Room>> {
    return this.roomsService.getPersonalRoomByRequest(req.user.id.toString(), friendId);
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', required: true })
  getChats(@Request() req, @Param('id') id) {
    return this.roomsService.getById(id, req.user.id.toString());
  }
  // @Get(':id/chats')
  // @HttpCode(HttpStatus.OK)
  // @ApiParam({ name: 'id', required: true })
  // getChats(@Param('id') id, @Query() dto?: GetChatDto) {
  //   return this.chatsService.findAll(id, new GetChatDto(dto));
  // }
}
