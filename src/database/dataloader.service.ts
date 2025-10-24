import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PrismaService } from './prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class DataLoaderService {
  constructor(private prisma: PrismaService) {}

  // Loader pour les Users
  public readonly usersLoader = new DataLoader(async (userIds: number[]) => {
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    const userMap = new Map(users.map(user => [user.id, user]));
    return userIds.map(id => userMap.get(id) || null);
  });

  // Loader pour les Availabilities
  public readonly availabilitiesLoader = new DataLoader(async (availabilityIds: number[]) => {
    const availabilities = await this.prisma.availability.findMany({
      where: { id: { in: availabilityIds } },
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
    });

    const availabilityMap = new Map(availabilities.map(av => [av.id, av]));
    return availabilityIds.map(id => availabilityMap.get(id) || null);
  });

  // Loader pour les Services
  public readonly servicesLoader = new DataLoader(async (serviceIds: number[]) => {
    const services = await this.prisma.service.findMany({
      where: { id: { in: serviceIds } },
    });

    const serviceMap = new Map(services.map(service => [service.id, service]));
    return serviceIds.map(id => serviceMap.get(id) || null);
  });

  // Loader pour les Events
  public readonly eventsLoader = new DataLoader(async (eventIds: number[]) => {
    const events = await this.prisma.event.findMany({
      where: { id: { in: eventIds } },
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
    });

    const eventMap = new Map(events.map(event => [event.id, event]));
    return eventIds.map(id => eventMap.get(id) || null);
  });

  // Loader pour les Availabilities par intervenant
  public readonly availabilitiesByIntervenantLoader = new DataLoader(async (intervenantIds: number[]) => {
    const availabilities = await this.prisma.availability.findMany({
      where: { intervenantId: { in: intervenantIds } },
    });

    const availabilityMap = new Map<number, any[]>();
    availabilities.forEach(av => {
      if (!availabilityMap.has(av.intervenantId)) {
        availabilityMap.set(av.intervenantId, []);
      }
      availabilityMap.get(av.intervenantId)!.push(av);
    });

    return intervenantIds.map(id => availabilityMap.get(id) || []);
  });

  // Loader pour les Bookings par intervenant
  public readonly bookingsByIntervenantLoader = new DataLoader(async (intervenantIds: number[]) => {
    const bookings = await this.prisma.booking.findMany({
      where: { intervenantId: { in: intervenantIds } },
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
    });

    const bookingMap = new Map<number, any[]>();
    bookings.forEach(booking => {
      if (!bookingMap.has(booking.intervenantId)) {
        bookingMap.set(booking.intervenantId, []);
      }
      bookingMap.get(booking.intervenantId)!.push(booking);
    });

    return intervenantIds.map(id => bookingMap.get(id) || []);
  });

  // Loader pour les Bookings par availability
  public readonly bookingsByAvailabilityLoader = new DataLoader(async (availabilityIds: number[]) => {
    const bookings = await this.prisma.booking.findMany({
      where: { availabilityId: { in: availabilityIds } },
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
    });

    const bookingMap = new Map<number, any[]>();
    
    // Grouper les bookings par availabilityId
    bookings.forEach(booking => {
      if (booking.availabilityId) {
        if (!bookingMap.has(booking.availabilityId)) {
          bookingMap.set(booking.availabilityId, []);
        }
        bookingMap.get(booking.availabilityId)!.push(booking);
      }
    });

    return availabilityIds.map(id => bookingMap.get(id) || []);
  });

  // Dans votre DataLoaderService
  public readonly bookingsByEventLoader = new DataLoader(async (eventIds: number[]) => {
    const bookings = await this.prisma.booking.findMany({
      where: { eventId: { in: eventIds } },
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
    });

    const bookingMap = new Map<number, any[]>();
    
    bookings.forEach(booking => {
      if (booking.eventId) {
        if (!bookingMap.has(booking.eventId)) {
          bookingMap.set(booking.eventId, []);
        }
        bookingMap.get(booking.eventId)!.push(booking);
      }
    });

    return eventIds.map(id => bookingMap.get(id) || []);
  });

  // Loader pour les Bookings par client
  public readonly bookingsByClientLoader = new DataLoader(async (clientIds: number[]) => {
    const bookings = await this.prisma.booking.findMany({
      where: { clientId: { in: clientIds } },
      include: {
        intervenant: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        availability: true,
        event: true,
      },
    });

    const bookingMap = new Map<number, any[]>();
    
    bookings.forEach(booking => {
      if (!bookingMap.has(booking.clientId)) {
        bookingMap.set(booking.clientId, []);
      }
      bookingMap.get(booking.clientId)!.push(booking);
    });

    return clientIds.map(id => bookingMap.get(id) || []);
  });
}