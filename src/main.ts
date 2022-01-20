import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config1 from 'config';
import { setupSwagger } from 'src/util/setupSwagger';

async function bootstrap() {
  const server = config1.get('server'); //config에서 server에 해당하는 것들
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  const port = server.port;
  await app.listen(port);
  console.log(`Connecting port ${port}`);
}
bootstrap();
