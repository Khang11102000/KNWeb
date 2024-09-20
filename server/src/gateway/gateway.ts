import {
  ConnectedSocket, MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({ cors: true })
export class MyGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(private readonly authService: AuthService) { }

  handleEmitSocket({ data, event, to }) {
    if (to) {
      // this.server.to(to.map((el) => String(el))).emit(event, data);
      this.server.to(to).emit(event, data);
    } else {
      this.server.emit(event, data);
    }
  }

  @SubscribeMessage('message')
  async handleMessage(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    console.log('message', data, socket.id);
    setTimeout(() => {
      this.server.to(socket.data.id + '1').emit('message', data);
    }, 1000);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  afterInit(socket: Socket): any { }

  async handleConnection(socket: Socket) {
    console.log('connecting', socket.id);
    const authHeader = socket.handshake.headers.authorization;
    const data: any = (authHeader as string)?.split(' ')[1];
    // const data: any = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzcwNGMxNGI2NzI2Yzc3ZGQ3NWUyMSIsInJvbGUiOnsiaWQiOiIyIn0sInNlc3Npb25JZCI6IjY2ZWM0NTgwNjIyNWEwMDVlNzc2MTk1MyIsImlhdCI6MTcyNjc2MDMyMCwiZXhwIjoxNzI2NzYzOTIwfQ.mEv4loG5GatPoVxzttl4s3sD9G58AgTfJ2qKQ2uIxPA';
    if (authHeader && data) {
      try {
        socket.data.id = await this.authService.handleVerifyToken(data);
        socket.join(socket.data.id);
        console.log('connect success');
      } catch (e) {
        console.log('disconnected 1')
        socket.disconnect();
      }
    } else {
      console.log('disconnected 2')

      socket.disconnect();
    }
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('disconnect', socket.id, socket.data?.id);
  }
}