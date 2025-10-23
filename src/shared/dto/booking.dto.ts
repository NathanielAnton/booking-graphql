import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { BookingStatus } from '@prisma/client';
import { User } from './user.dto';
import { Availability } from './availability.dto';
import { Event } from './event.dto';

registerEnumType(BookingStatus, {
  name: 'BookingStatus',
});

@ObjectType()
export class Booking {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  clientId: number;

  @Field(() => Int)
  intervenantId: number;

  @Field(() => Int, { nullable: true })
  eventId?: number;

  @Field(() => Int, { nullable: true })
  availabilityId?: number;

  @Field(() => BookingStatus)
  status: BookingStatus;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class BookingWithRelations extends Booking {
  @Field(() => User)
  client: User;

  @Field(() => User)
  intervenant: User;

  @Field(() => Event, { nullable: true })
  event?: Event;

  @Field(() => Availability, { nullable: true })
  availability?: Availability;
}