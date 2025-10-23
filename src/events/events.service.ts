import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { EventStatus } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ limit, skip }: { limit: number; skip: number }) {
    return this.prisma.event.findMany({
      take: limit,
      skip,
      // Pas de include = seulement les champs de base
    });
  }

  async findOne(id: number) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  async findByIntervenant(intervenantId: number, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.event.findMany({
      where: { intervenantId },
      take: limit,
      skip,
    });
  }

  async findAllWithRelations({ limit, skip }: { limit: number; skip: number }) {
    return this.prisma.event.findMany({
      take: limit,
      skip,
      include: {
        intervenant: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
        participants: {
          include: {
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
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
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        intervenant: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
        participants: {
          include: {
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
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

  async findByIntervenantWithRelations(intervenantId: number, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.event.findMany({
      where: { intervenantId },
      take: limit,
      skip,
      include: {
        intervenant: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
        participants: {
          include: {
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
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

  // Méthodes utilitaires supplémentaires
  async findUpcoming({ limit, skip }: { limit: number; skip: number }) {
    return this.prisma.event.findMany({
      where: {
        startDate: {
          gte: new Date(),
        },
      },
      take: limit,
      skip,
      orderBy: {
        startDate: 'asc',
      },
    });
  }

  async findUpcomingWithRelations({ limit, skip }: { limit: number; skip: number }) {
    return this.prisma.event.findMany({
      where: {
        startDate: {
          gte: new Date(),
        },
      },
      take: limit,
      skip,
      orderBy: {
        startDate: 'asc',
      },
      include: {
        intervenant: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
        participants: {
          include: {
            client: {
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