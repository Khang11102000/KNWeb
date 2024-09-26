import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { GetChatDto } from 'src/chats/dto/get-chat.dto';
import { ChatService } from 'src/chats/chat.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('rooms')
export class RoomsController {

  constructor(
    private readonly roomsService: RoomsService,
    private readonly chatsService: ChatService,
  ) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  create(@Request() req, @Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(req.user._id.toString(), createRoomDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getByRequest(@Request() req) {
    return this.roomsService.getByRequest(req.user._id.toString());
  }

  @Get(':id/chats')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true })
  getChats(@Param('id') id, @Query() dto: GetChatDto) {
    return this.chatsService.findAll(id, new GetChatDto(dto));
  }
}
