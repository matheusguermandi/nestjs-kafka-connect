import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('any_name_i_want') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    ['kafka.connect.topic'].forEach((key) =>
      this.client.subscribeToResponseOf(`${key}`),
    );
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @Get('kafka-connect')
  async testKafkaWithResponse(@Body() payload: unknown) {
    const registry = new SchemaRegistry({
      host: 'http://10.5.0.1:8081/',
    });

    const encodedValue = await registry.encode(2, payload);

    return this.client.send('kafka.connect.topic', encodedValue);
  }
}
