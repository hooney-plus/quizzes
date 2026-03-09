import { Module } from '@nestjs/common';
import { PlayerController } from '../controllers/player.controller';
import { CreatePlayerUseCase } from '../../application/use-cases/create-player.use-case';
import { GetLeaderboardUseCase } from '../../application/use-cases/get-leaderboard.use-case';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserPrismaRepository } from '../database/user.prisma.repository';

@Module({
  controllers: [PlayerController],
  providers: [
    CreatePlayerUseCase,
    GetLeaderboardUseCase,
    { provide: UserRepository, useClass: UserPrismaRepository },
  ],
})
export class PlayerModule {}
