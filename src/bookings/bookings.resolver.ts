import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { Booking, BookingWithRelations } from '../shared/dto/booking.dto';
import { BookingStatus } from '@prisma/client';

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

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

}