import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { RepositorioDeQuarteiroesPrisma } from './repositorios/repositorio-de-quarteiroes-prisma';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, RepositorioDeQuarteiroesPrisma],
})
export class AppModule {}
