import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketIoGateway {

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log("Hello");
    return 'Hello world!';
  }
}
