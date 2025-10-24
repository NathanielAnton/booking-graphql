import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AvailabilitiesService {
  constructor(private prisma: PrismaService) {}

  async findAll({ limit, skip }: { limit: number; skip: number }) {
    return this.prisma.availability.findMany({
      take: limit,
      skip,
      // Pas de include = seulement les champs de base
    });
  }

  async findOne(id: number) {
    return this.prisma.availability.findUnique({
      where: { id },
    });
  }

  async findByIntervenant(intervenantId: number, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.availability.findMany({
      where: { intervenantId },
      take: limit,
      skip,
    });
  }

  async findByDayOfWeek(dayOfWeek: number, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.availability.findMany({
      where: { dayOfWeek },
      take: limit,
      skip,
    });
  }

  async findAvailableSlots({ limit, skip }: { limit: number; skip: number }) {
    return this.prisma.availability.findMany({
      where: { isAvailable: true },
      take: limit,
      skip,
    });
  }

  async findAllWithRelations({ limit, skip }: { limit: number; skip: number }) {
    return this.prisma.availability.findMany({
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
        bookings: {
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

  async findOneWithRelations(id: number) {
    return this.prisma.availability.findUnique({
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
        bookings: {
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
    return this.prisma.availability.findMany({
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
        bookings: {
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

  async findByDayOfWeekWithRelations(dayOfWeek: number, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.availability.findMany({
      where: { dayOfWeek },
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
        bookings: {
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

  async findAvailableSlotsWithRelations({ limit, skip }: { limit: number; skip: number }) {
    return this.prisma.availability.findMany({
      where: { isAvailable: true },
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
        bookings: {
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

  // Méthodes utilitaires supplémentaires
  async findByIntervenantAndDay(intervenantId: number, dayOfWeek: number) {
    return this.prisma.availability.findMany({
      where: {
        intervenantId,
        dayOfWeek,
      },
    });
  }

  async findByIntervenantAndDayWithRelations(intervenantId: number, dayOfWeek: number) {
    return this.prisma.availability.findMany({
      where: {
        intervenantId,
        dayOfWeek,
      },
      include: {
        intervenant: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        bookings: {
          include: {
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  }
}