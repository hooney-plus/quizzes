import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { CreatePlayerUseCase } from '../../application/use-cases/create-player.use-case';
import { GetLeaderboardUseCase } from '../../application/use-cases/get-leaderboard.use-case';
import { CreatePlayerDto } from '../dtos/create-player.dto';

@Controller('players')
export class PlayerController {
  constructor(
    private readonly createPlayerUseCase: CreatePlayerUseCase,
    private readonly getLeaderboardUseCase: GetLeaderboardUseCase,
  ) {}

  @Post()
  async createPlayer(@Body() dto: CreatePlayerDto) {
    return this.createPlayerUseCase.execute(dto.nickname);
  }

  @Get('leaderboard')
  async getLeaderboard(@Query('limit') limit = '10') {
    return this.getLeaderboardUseCase.execute(Number(limit));
  }
}
