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
        event: true,
        availability: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.booking.findUnique({
      where: { id },
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
        event: true,
        availability: true,
      },
    });
  }

  async create(data: {
    clientId: number;
    intervenantId: number;
    eventId?: number;
    availabilityId?: number;
    status?: BookingStatus;
  }) {
    return this.prisma.booking.create({
      data: {
        clientId: data.clientId,
        intervenantId: data.intervenantId,
        eventId: data.eventId,
        availabilityId: data.availabilityId,
        status: data.status || BookingStatus.PENDING,
      },
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
        event: true,
        availability: true,
      },
    });
  }

  async update(id: number, status: BookingStatus) {
    return this.prisma.booking.update({
      where: { id },
      data: { status },
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
        event: true,
        availability: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.booking.delete({
      where: { id },
    });
  }
}