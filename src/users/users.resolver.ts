import { Resolver, Query, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { DataLoaderService } from '../database/dataloader.service';
import { User } from '../shared/dto/user.dto';
import { Booking } from '../shared/dto/booking.dto';
import { Availability } from '../shared/dto/availability.dto';
import { Event } from '../shared/dto/event.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly dataLoaderService: DataLoaderService,
  ) {}

  @Query(() => [User])
  users(
    @Args('limit', { type: () => Int, nullable: true }) limit = 10,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.usersService.findAll({ limit, skip });
  }

  @Query(() => User, { nullable: true })
  user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  // === RESOLVE FIELDS AVEC DATALOADER ===

  // Bookings où l'user est client
  @ResolveField('bookingsAsClient', () => [Booking])
  async getBookingsAsClient(@Parent() user: User) {
    return this.dataLoaderService.bookingsByClientLoader.load(user.id);
  }

  // Bookings où l'user est intervenant
  @ResolveField('bookingsAsIntervenant', () => [Booking])
  async getBookingsAsIntervenant(@Parent() user: User) {
    return this.dataLoaderService.bookingsByIntervenantLoader.load(user.id);
  }

  // Availabilities de l'user (s'il est intervenant)
  @ResolveField('availabilities', () => [Availability])
  async getAvailabilities(@Parent() user: User) {
    return this.dataLoaderService.availabilitiesByIntervenantLoader.load(user.id);
  }
}