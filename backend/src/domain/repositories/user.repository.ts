import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(nickname: string): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByNickname(nickname: string): Promise<User | null>;
  abstract updateXp(id: string, xp: number): Promise<User>;
  abstract findLeaderboard(limit: number): Promise<User[]>;
}
