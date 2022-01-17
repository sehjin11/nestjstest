import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMconfig } from './configs/typeorm.config';

@Module({
  imports: [BoardModule, AuthModule, TypeOrmModule.forRoot(typeORMconfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
