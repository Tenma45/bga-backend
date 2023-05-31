import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { SocketIoGateway } from './gateways/socket-io.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SocketIoGateway],
})
export class AppModule {}
