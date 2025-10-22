import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  // Se connecte automatiquement au démarrage
  async onModuleInit() {
    await this.$connect();
    console.log('✅ Connecté à la base de données');
  }

  // Se déconnecte automatiquement à l'arrêt
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('✅ Déconnecté de la base de données');
  }
}