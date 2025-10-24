import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ServiceOfferingsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ limit, skip }: { limit: number; skip: number }) {
    return this.prisma.serviceOffering.findMany({
      take: limit,
      skip,
    });
  }

  async findOne(id: number) {
    return this.prisma.serviceOffering.findUnique({
      where: { id },
    });
  }

  async findByService(serviceId: number, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.serviceOffering.findMany({
      where: { serviceId },
      take: limit,
      skip,
    });
  }

  async findByIntervenant(intervenantId: number, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.serviceOffering.findMany({
      where: { intervenantId },
      take: limit,
      skip,
    });
  }

  async findAllWithRelations({ limit, skip }: { limit: number; skip: number }) {
    return this.prisma.serviceOffering.findMany({
      take: limit,
      skip,
      include: {
        service: true,
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
      },
    });
  }

  async findOneWithRelations(id: number) {
    return this.prisma.serviceOffering.findUnique({
      where: { id },
      include: {
        service: true,
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
      },
    });
  }

  async findByServiceWithRelations(serviceId: number, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.serviceOffering.findMany({
      where: { serviceId },
      take: limit,
      skip,
      include: {
        service: true,
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
      },
    });
  }

  async findByIntervenantWithRelations(intervenantId: number, { limit, skip }: { limit: number; skip: number }) {
    return this.prisma.serviceOffering.findMany({
      where: { intervenantId },
      take: limit,
      skip,
      include: {
        service: true,
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
      },
    });
  }

  // Méthodes utilitaires
  async findByServiceAndIntervenant(serviceId: number, intervenantId: number) {
    return this.prisma.serviceOffering.findFirst({
      where: {
        serviceId,
        intervenantId,
      },
    });
  }

  async findByServiceAndIntervenantWithRelations(serviceId: number, intervenantId: number) {
    return this.prisma.serviceOffering.findFirst({
      where: {
        serviceId,
        intervenantId,
      },
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
    });
  }
}