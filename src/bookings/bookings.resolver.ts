import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { Booking, BookingWithRelations } from '../shared/dto/booking.dto';
import { BookingStatus } from '@prisma/client';

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @Query(() => [BookingWithRelations])
  bookings(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.bookingsService.findAll({ limit, skip });
  }

  @Query(() => BookingWithRelations, { nullable: true })
  booking(@Args('id', { type: () => Int }) id: number) {
    return this.bookingsService.findOne(id);
  }

  @Mutation(() => BookingWithRelations)
  createBooking(
    @Args('clientId', { type: () => Int }) clientId: number,
    @Args('intervenantId', { type: () => Int }) intervenantId: number,
    @Args('eventId', { type: () => Int, nullable: true }) eventId?: number,
    @Args('availabilityId', { type: () => Int, nullable: true }) availabilityId?: number,
    @Args('status', { type: () => BookingStatus, nullable: true }) status?: BookingStatus,
  ) {
    return this.bookingsService.create({
      clientId,
      intervenantId,
      eventId,
      availabilityId,
      status,
    });
  }

  @Mutation(() => BookingWithRelations)
  updateBookingStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status', { type: () => BookingStatus }) status: BookingStatus,
  ) {
    return this.bookingsService.update(id, status);
  }

  @Mutation(() => Booking)
  deleteBooking(@Args('id', { type: () => Int }) id: number) {
    return this.bookingsService.remove(id);
  }
}