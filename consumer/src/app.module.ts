import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'any_name_i_want',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'any_client_id_i_want',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'an_unique_string_id',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
