import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}
  
  async findAll({ limit, skip }: { limit: number; skip: number }) {
    return this.prisma.booking.findMany({
      take: limit,
      skip,
      // Pas de include = seulement les champs de base
    });
  }

  async findOne(id: number) {
    return this.prisma.booking.findUnique({
      where: { id },
    });
  }
  
  async findAllWithRelations({ limit, skip }: { limit: number; skip: number }) {
    return this.prisma.booking.findMany({
      take: limit,
      skip,
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
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
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            startDate: true,
            endDate: true,
            location: true,
            status: true,
          },
        },
        availability: {
          select: {
            id: true,
            dayOfWeek: true,
            startTime: true,
            endTime: true,
            isAvailable: true,
          },
        },
      },
    });
  }

  async findOneWithRelations(id: number) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
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
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            startDate: true,
            endDate: true,
            location: true,
            status: true,
          },
        },
        availability: {
          select: {
            id: true,
            dayOfWeek: true,
            startTime: true,
            endTime: true,
            isAvailable: true,
          },
        },
      },
    });
  }

  // Méthodes utilitaires
  async findByClient(clientId: number, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.booking.findMany({
      where: { clientId },
      take: limit,
      skip,
    });
  }

  async findByIntervenant(intervenantId: number, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.booking.findMany({
      where: { intervenantId },
      take: limit,
      skip,
    });
  }
}