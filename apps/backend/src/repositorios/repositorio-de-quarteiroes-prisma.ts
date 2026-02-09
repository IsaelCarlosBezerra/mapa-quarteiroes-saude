import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Quarteirao, RepositorioDeQuarteiroes } from 'core';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RepositorioDeQuarteiroesPrisma implements RepositorioDeQuarteiroes {
  constructor(private readonly prisma: PrismaService) {}

  async salvarMuitos(quarteiroes: Quarteirao[]): Promise<void> {
    if (quarteiroes.length === 0) return;

    const data: Prisma.QuarteiraoCreateManyInput[] = quarteiroes.map((q) =>
      Prisma.validator<Prisma.QuarteiraoCreateManyInput>()({
        id: q.id,
        numero: q.numero,
      }),
    );

    await this.prisma.quarteirao.createMany({
      data,
      skipDuplicates: true,
    });
  }
}
