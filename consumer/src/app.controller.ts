import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  Payload,
  MessagePattern,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('kafka.connect.topic')
  async readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    const registry = new SchemaRegistry({
      host: 'http://10.5.0.1:8081/',
    });

    const originalMessage = context.getMessage();

    const decodedValue = await registry.decode(originalMessage.value);

    console.log(
      '\n🚀 ~ file: app.controller.ts:23 ~ AppController ~ readMessage ~ decodedValue\n',
      decodedValue,
    );

    const response =
      `Receiving a new message from topic: kafka.connect.topic: ` +
      JSON.stringify(decodedValue);

    return response;
  }
}
