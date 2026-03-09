import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class GetLeaderboardUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(limit = 10): Promise<User[]> {
    return this.userRepository.findLeaderboard(limit);
  }
}
