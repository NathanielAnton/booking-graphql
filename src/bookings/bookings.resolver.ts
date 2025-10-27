import { Resolver, Query, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { DataLoaderService } from '../database/dataloader.service';
import { Booking, BookingWithRelations } from '../shared/dto/booking.dto';
import { User } from '../shared/dto/user.dto';
import { Event } from '../shared/dto/event.dto';
import { Availability } from '../shared/dto/availability.dto';
import { PaginatedBookings, PaginatedBookingsWithRelations } from '../shared/dto/pagination.dto';

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly dataLoaderService: DataLoaderService,
  ) {}

  // === QUERIES SIMPLES (IDs seulement) ===

  @Query(() => [Booking])
  bookings(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.bookingsService.findAll({ limit, skip });
  }

  @Query(() => Booking, { nullable: true })
  booking(@Args('id', { type: () => Int }) id: number) {
    return this.bookingsService.findOne(id);
  }

  @Query(() => [Booking])
  bookingsByClient(
    @Args('clientId', { type: () => Int }) clientId: number,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.bookingsService.findByClient(clientId, { limit, skip });
  }

  @Query(() => [Booking])
  bookingsByIntervenant(
    @Args('intervenantId', { type: () => Int }) intervenantId: number,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.bookingsService.findByIntervenant(intervenantId, { limit, skip });
  }

  // === QUERIES AVEC RELATIONS (objets complets) ===

  @Query(() => [BookingWithRelations])
  bookingsWithRelations(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.bookingsService.findAllWithRelations({ limit, skip });
  }

  @Query(() => BookingWithRelations, { nullable: true })
  bookingWithRelations(@Args('id', { type: () => Int }) id: number) {
    return this.bookingsService.findOneWithRelations(id);
  }

  // === RESOLVE FIELDS AVEC DATALOADER ===

  @ResolveField('client', () => User)
  async getClient(@Parent() booking: Booking) {
    return this.dataLoaderService.usersLoader.load(booking.clientId);
  }

  @ResolveField('intervenant', () => User)
  async getIntervenant(@Parent() booking: Booking) {
    return this.dataLoaderService.usersLoader.load(booking.intervenantId);
  }

  @ResolveField('event', () => Event, { nullable: true })
  async getEvent(@Parent() booking: Booking) {
    if (!booking.eventId) return null;
    return this.dataLoaderService.eventsLoader.load(booking.eventId);
  }

  @ResolveField('availability', () => Availability, { nullable: true })
  async getAvailability(@Parent() booking: Booking) {
    if (!booking.availabilityId) return null;
    return this.dataLoaderService.availabilitiesLoader.load(booking.availabilityId);
  }

  @Query(() => PaginatedBookings)
  async paginatedBookings(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.bookingsService.paginate({ limit, skip });
  }

  @Query(() => PaginatedBookingsWithRelations)
  async paginatedBookingsWithRelations(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.bookingsService.paginateWithRelations({ limit, skip });
  }
}