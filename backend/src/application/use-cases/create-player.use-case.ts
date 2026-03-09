import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class CreatePlayerUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(nickname: string): Promise<User> {
    const existing = await this.userRepository.findByNickname(nickname);
    if (existing) return existing;
    return this.userRepository.create(nickname);
  }
}
