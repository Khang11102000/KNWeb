import { RoomsService } from './../rooms/rooms.service';
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

@WebSocketGateway(800, {
  namespace: '/chats',
  cors: true
})
// @UseGuards(AuthGuard('jwt'))
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatsService: ChatService,
    private readonly authService: AuthService,
    // private readonly roomService: RoomsService
  ) { }
  public userOnline: string[] = []
  @WebSocketServer()
  private server: Server;
  afterInit(client: Socket) {
    console.log("Init")
    client.use((socket, next) => wsAuthMiddleware(socket, next));
  }
  @SubscribeMessage('user-online')
  async getUserOnline(
    @ConnectedSocket() client: Socket,
    room: string
  ) {
    this.server
      .to(room)
      .emit('user-online', this.userOnline);
  }
  @SubscribeMessage('new-room')
  getNewRoom({ room, receiver }) {
    this.server
      .to(room)
      .emit('new-room', room);
  }
  @SubscribeMessage('create')
  async create(
    @ConnectedSocket() client: Socket,
    @MessageBody() createChatDto: CreateChatDto
  ) {
    // const senderId = client.handshake.user.id.toString();
    const senderId = client.handshake.auth.userId.toString();

    const chat = await this.chatsService.create(senderId, createChatDto);
    this.server
      .to(createChatDto.room_id)
      .emit('new-chat', chat);
  }
  async handleConnection(client: Socket) {
    const auth = client.handshake.headers.authorization
    if (auth && auth.split(' ')[1]) {
      try {
        client.data.id = await this.authService.handleVerifyToken(auth.split(' ')[1])
        if (client?.data?.id) {
          // const rooms = await this.roomService.getByRequest(client.data.id)
          // if (rooms && rooms.length > 0) {
          //   client.join(rooms.map((room) => { return room.id }));
          // }
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
  async handleDisconnect(@ConnectedSocket() client: Socket) {
    // this.userOnline = this.userOnline.filter(item => item !== client.data.id)
    console.log("Disconnected Socket:", client.id, " _ User:", client.data.id)
  }

}
