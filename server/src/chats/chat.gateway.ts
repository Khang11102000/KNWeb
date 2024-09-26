import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { wsAuthMiddleware } from 'src/config/ws-auth.middleware';
import { AuthGuard } from '@nestjs/passport';

@WebSocketGateway(800, {
  namespace: '/chats',
})
@UseGuards(AuthGuard('jwt'))
export class ChatsGateway {

  constructor(private readonly chatsService: ChatService) { }

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('create')
  async create(
    @ConnectedSocket() client,
    @MessageBody() createChatDto: CreateChatDto
  ) {
    const senderId = client.handshake.user._id.toString();
    const chat = await this.chatsService.create(senderId, createChatDto);

    this.server.emit('new-chat', chat);
  }

  afterInit(client: Socket) {
    client.use((socket, next) => wsAuthMiddleware(socket, next));
  }
}
