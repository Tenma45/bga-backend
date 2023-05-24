import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketIoGateway {

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket): string {
    const socketId = socket.id
    const message = data.message!
    console.log('Hello from',socketId);
    this.server.emit('message', {id:socketId, message:message});
    return;
  }
}
