import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const server = config.get('server'); //config에서 server에 해당하는 것들

  const app = await NestFactory.create(AppModule);
  const port = server.port;
  await app.listen(port);
  console.log(`Connecting port ${port}`);
}
bootstrap();
