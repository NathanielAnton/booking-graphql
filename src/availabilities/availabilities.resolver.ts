import { Resolver, Query, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { AvailabilitiesService } from './availabilities.service';
import { DataLoaderService } from '../database/dataloader.service';
import { Availability, AvailabilityWithRelations } from '../shared/dto/availability.dto';
import { User } from '../shared/dto/user.dto';
import { Booking } from '../shared/dto/booking.dto';

@Resolver(() => Availability)
export class AvailabilitiesResolver {
  constructor(
    private readonly availabilitiesService: AvailabilitiesService,
    private readonly dataLoaderService: DataLoaderService,
  ) {}

  // === QUERIES ===

  @Query(() => [Availability])
  availabilities(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.availabilitiesService.findAll({ limit, skip });
  }

  @Query(() => Availability, { nullable: true })
  availability(@Args('id', { type: () => Int }) id: number) {
    return this.availabilitiesService.findOne(id);
  }

  @Query(() => [Availability])
  availabilitiesByIntervenant(
    @Args('intervenantId', { type: () => Int }) intervenantId: number,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.availabilitiesService.findByIntervenant(intervenantId, { limit, skip });
  }

  @Query(() => [Availability])
  availabilitiesByDay(
    @Args('dayOfWeek', { type: () => Int }) dayOfWeek: number,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.availabilitiesService.findByDayOfWeek(dayOfWeek, { limit, skip });
  }

  @Query(() => [Availability])
  availableSlots(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.availabilitiesService.findAvailableSlots({ limit, skip });
  }

  @Query(() => [Availability])
  availabilitiesByIntervenantAndDay(
    @Args('intervenantId', { type: () => Int }) intervenantId: number,
    @Args('dayOfWeek', { type: () => Int }) dayOfWeek: number,
  ) {
    return this.availabilitiesService.findByIntervenantAndDay(intervenantId, dayOfWeek);
  }

  @Query(() => [AvailabilityWithRelations])
  availabilitiesWithRelations(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.availabilitiesService.findAllWithRelations({ limit, skip });
  }

  @Query(() => AvailabilityWithRelations, { nullable: true })
  availabilityWithRelations(@Args('id', { type: () => Int }) id: number) {
    return this.availabilitiesService.findOneWithRelations(id);
  }

  @Query(() => [AvailabilityWithRelations])
  availabilitiesByIntervenantWithRelations(
    @Args('intervenantId', { type: () => Int }) intervenantId: number,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.availabilitiesService.findByIntervenantWithRelations(intervenantId, { limit, skip });
  }

  @Query(() => [AvailabilityWithRelations])
  availabilitiesByDayWithRelations(
    @Args('dayOfWeek', { type: () => Int }) dayOfWeek: number,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.availabilitiesService.findByDayOfWeekWithRelations(dayOfWeek, { limit, skip });
  }

  @Query(() => [AvailabilityWithRelations])
  availableSlotsWithRelations(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.availabilitiesService.findAvailableSlotsWithRelations({ limit, skip });
  }

  @Query(() => [AvailabilityWithRelations])
  availabilitiesByIntervenantAndDayWithRelations(
    @Args('intervenantId', { type: () => Int }) intervenantId: number,
    @Args('dayOfWeek', { type: () => Int }) dayOfWeek: number,
  ) {
    return this.availabilitiesService.findByIntervenantAndDayWithRelations(intervenantId, dayOfWeek);
  }

  // === RESOLVE FIELDS AVEC DATALOADER ===

  @ResolveField('intervenant', () => User)
  async getIntervenant(@Parent() availability: Availability) {
    return this.dataLoaderService.usersLoader.load(availability.intervenantId);
  }

  @ResolveField('bookings', () => [Booking])
  async getBookings(@Parent() availability: Availability) {
    return this.dataLoaderService.bookingsByAvailabilityLoader.load(availability.id);
  }
}