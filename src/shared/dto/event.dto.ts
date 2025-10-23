import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { EventStatus } from '@prisma/client';
import { User } from './user.dto';
import { Booking } from './booking.dto';

registerEnumType(EventStatus, {
  name: 'EventStatus',
});

@ObjectType()
export class Event {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field({ nullable: true })
  location?: string;

  @Field(() => EventStatus)
  status: EventStatus;

  @Field(() => Int)
  intervenantId: number;
}

@ObjectType()
export class EventWithRelations {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field({ nullable: true })
  location?: string;

  @Field(() => EventStatus)
  status: EventStatus;

  @Field(() => Int)
  intervenantId: number;

  // Relations
  @Field(() => User)
  intervenant: User;

  @Field(() => [Booking])
  participants: Booking[];
}