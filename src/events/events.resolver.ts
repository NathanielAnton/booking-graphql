import { Resolver, Query, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { DataLoaderService } from '../database/dataloader.service';
import { Event, EventWithRelations } from '../shared/dto/event.dto';
import { User } from '../shared/dto/user.dto';
import { Booking } from '../shared/dto/booking.dto';

@Resolver(() => Event)
export class EventsResolver {
  constructor(
    private readonly eventsService: EventsService,
    private readonly dataLoaderService: DataLoaderService,
  ) {}

  // === QUERIES ===

  @Query(() => [Event])
  events(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.eventsService.findAll({ limit, skip });
  }

  @Query(() => Event, { nullable: true })
  event(@Args('id', { type: () => Int }) id: number) {
    return this.eventsService.findOne(id);
  }

  @Query(() => [Event])
  eventsByIntervenant(
    @Args('intervenantId', { type: () => Int }) intervenantId: number,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.eventsService.findByIntervenant(intervenantId, { limit, skip });
  }

  @Query(() => [Event])
  upcomingEvents(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.eventsService.findUpcoming({ limit, skip });
  }

  @Query(() => [EventWithRelations])
  eventsWithRelations(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.eventsService.findAllWithRelations({ limit, skip });
  }

  @Query(() => EventWithRelations, { nullable: true })
  eventWithRelations(@Args('id', { type: () => Int }) id: number) {
    return this.eventsService.findOneWithRelations(id);
  }

  @Query(() => [EventWithRelations])
  eventsByIntervenantWithRelations(
    @Args('intervenantId', { type: () => Int }) intervenantId: number,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.eventsService.findByIntervenantWithRelations(intervenantId, { limit, skip });
  }

  @Query(() => [EventWithRelations])
  upcomingEventsWithRelations(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.eventsService.findUpcomingWithRelations({ limit, skip });
  }

  // === RESOLVE FIELDS AVEC DATALOADER ===

  @ResolveField('intervenant', () => User)
  async getIntervenant(@Parent() event: Event) {
    return this.dataLoaderService.usersLoader.load(event.intervenantId);
  }

  @ResolveField('bookings', () => [Booking])
  async getBookings(@Parent() event: Event) {
    return this.dataLoaderService.bookingsByEventLoader.load(event.id);
  }
}