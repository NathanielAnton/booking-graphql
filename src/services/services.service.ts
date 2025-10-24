// src/services/services.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  // === VERSION SIMPLE (IDs seulement) ===

  async findAll({ limit, skip }: { limit: number; skip: number }) {
    return this.prisma.service.findMany({
      take: limit,
      skip,
    });
  }

  async findOne(id: number) {
    return this.prisma.service.findUnique({
      where: { id },
    });
  }

  async findByCategory(category: string, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.service.findMany({
      where: { category },
      take: limit,
      skip,
    });
  }

  async searchByName(name: string, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.service.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      take: limit,
      skip,
    });
  }

  // === VERSION AVEC RELATIONS (objets complets) ===

  async findAllWithRelations({ limit, skip }: { limit: number; skip: number }) {
    return this.prisma.service.findMany({
      take: limit,
      skip,
      include: {
        offerings: {
          include: {
            service: true, 
            intervenant: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async findOneWithRelations(id: number) {
    return this.prisma.service.findUnique({
      where: { id },
      include: {
        offerings: {
          include: {
            service: true,
            intervenant: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async findByCategoryWithRelations(category: string, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.service.findMany({
      where: { category },
      take: limit,
      skip,
      include: {
        offerings: {
          include: {
            service: true,
            intervenant: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async searchByNameWithRelations(name: string, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.service.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      take: limit,
      skip,
      include: {
        offerings: {
          include: {
            service: true,
            intervenant: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  // Méthodes utilitaires
  async findServicesByPriceRange(minPrice: number, maxPrice: number, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.service.findMany({
      where: {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
      take: limit,
      skip,
    });
  }

  async findServicesByPriceRangeWithRelations(minPrice: number, maxPrice: number, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.service.findMany({
      where: {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
      take: limit,
      skip,
      include: {
        offerings: {
          include: {
            intervenant: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
}