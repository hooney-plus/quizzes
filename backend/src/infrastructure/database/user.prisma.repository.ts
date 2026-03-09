import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(raw: any): User {
    return new User(raw.id, raw.nickname, raw.xp, raw.createdAt);
  }

  async create(nickname: string): Promise<User> {
    const raw = await this.prisma.user.create({ data: { nickname } });
    return this.toEntity(raw);
  }

  async findById(id: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({ where: { id } });
    return raw ? this.toEntity(raw) : null;
  }

  async findByNickname(nickname: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({ where: { nickname } });
    return raw ? this.toEntity(raw) : null;
  }

  async updateXp(id: string, xp: number): Promise<User> {
    const raw = await this.prisma.user.update({ where: { id }, data: { xp } });
    return this.toEntity(raw);
  }

  async findLeaderboard(limit: number): Promise<User[]> {
    const rows = await this.prisma.user.findMany({ orderBy: { xp: 'desc' }, take: limit });
    return rows.map((r: any) => this.toEntity(r));
  }
}
