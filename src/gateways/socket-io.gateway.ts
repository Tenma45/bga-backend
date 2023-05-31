import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from 'src/models/message.model';
import { Room } from 'src/models/room.model';
import { User } from 'src/models/user.model';

@WebSocketGateway({ cors: true })
export class SocketIoGateway {

  rooms: Room[] = []

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: Message, @ConnectedSocket() socket: Socket): string {
    const socketId = socket.id
    const message = data.message
    console.log('Hello from',socketId);
    this.server.emit('message', {id:socketId, message:message});
    return;
  }

  
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    // Find or create the room
    let room = this.rooms.find((r) => r.id === roomId);
    if (!room) {
      room = { id: roomId, name: 'Room', users: [], capacity: 10 };
      this.rooms.push(room);
    }

    // Add the user to the room
    room.users.push({ socketId: client.id, name: 'User' });

    // Emit an event to inform other clients in the room
    client.to(roomId).emit('userJoined', room);

    // Join the room
    client.join(roomId);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomId: string) {
    // Find the room
    const room = this.rooms.find((r) => r.id === roomId);
    if (!room) {
      return;
    }

    // Remove the user from the room
    room.users = room.users.filter((user) => user.socketId !== client.id);

    // Emit an event to inform other clients in the room
    client.to(roomId).emit('userLeft', room);

    // Leave the room
    client.leave(roomId);
  }
}