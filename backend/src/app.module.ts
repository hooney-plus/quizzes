import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/modules/prisma.module';
import { QuizModule } from './infrastructure/modules/quiz.module';
import { PlayerModule } from './infrastructure/modules/player.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    QuizModule,
    PlayerModule,
  ],
})
export class AppModule {}
