import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.dto';
import { Booking } from './booking.dto';

@ObjectType()
export class Availability {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  intervenantId: number;

  @Field(() => Int)
  dayOfWeek: number;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field()
  isAvailable: boolean;
}

@ObjectType()
export class AvailabilityWithRelations {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  intervenantId: number;

  @Field(() => Int)
  dayOfWeek: number;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field()
  isAvailable: boolean;

  // Relations
  @Field(() => User)
  intervenant: User;

  @Field(() => [Booking])
  bookings: Booking[];
}