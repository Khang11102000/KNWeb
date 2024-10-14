import {
  WebSocketGateway, SubscribeMessage, MessageBody,
  WebSocketServer, ConnectedSocket, OnGatewayInit,
  OnGatewayConnection, OnGatewayDisconnect
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { wsAuthMiddleware } from 'src/config/ws-auth.middleware';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { GetChatDto } from './dto/get-chat.dto';

@WebSocketGateway(800, {
  namespace: '/chats',
  cors: true
})
// @UseGuards(AuthGuard('jwt'))
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatsService: ChatService,
    private readonly authService: AuthService,
    private readonly roomService: RoomsService
  ) { }
  public userOnline: string[] = []
  @WebSocketServer()
  private server: Server;
  afterInit(client: Socket) {
    client.use((socket, next) => wsAuthMiddleware(socket, next));
  }
  async handleConnection(client: Socket) {
    const auth = client.handshake.headers.authorization
    if (auth && auth.split(' ')[1]) {
      try {
        client.data.id = await this.authService.handleVerifyToken(auth.split(' ')[1])
        if (client.data.id) {
          this.userOnline.push(client.data.id)
          const rooms = await this.roomService.getByRequest(client.data.id)
          const roomIds: string[] = [client.data.id]
          rooms?.map((item) => {
            roomIds.push(item.id.toString())
          })
          client.join([...roomIds])
        }
        else {
          throw (error) => {
            console.log(error)
          }
        }
        // this.userOnline.push(client.data.id)
      } catch (error) {
        client.disconnect()
      }
    }
    else {
      client.disconnect();
    }
  }
  @SubscribeMessage('user-online')
  async getUserOnline(
    @ConnectedSocket() client: Socket,
  ) {
    this.server
      .to(client.data.id)
      .emit('user-online', this.userOnline);
  }
  @SubscribeMessage('get-room')
  async getRoom(@ConnectedSocket() client: Socket, userId: string) {
    const rooms = await this.roomService.getByRequest(client.data.id)
    this.server
      .to(client.data.id)
      .emit('room-data', rooms);
  }
  @SubscribeMessage('get-message')
  async getMessage(@ConnectedSocket() client: Socket, @MessageBody() { roomId }) {
    const messages = await this.chatsService.findAll(roomId, new GetChatDto(null))
    this.server
      .to(roomId)
      .emit('message-data', messages);
  }
  @SubscribeMessage('create')
  async create(
    @ConnectedSocket() client: Socket,
    @MessageBody() createChatDto: CreateChatDto
  ) {
    // const senderId = client.handshake.user.id.toString();
    const senderId = client.data.id.toString();
    const chat = await this.chatsService.create(senderId, createChatDto);
    await this.roomService.updateActive(createChatDto.room_id);
    this.server
      .to(createChatDto.room_id)
      .emit('new-chat', chat);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    this.userOnline = this.userOnline.filter(item => item !== client.data.id)
  }

}
