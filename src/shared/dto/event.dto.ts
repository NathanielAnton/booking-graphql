import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { EventStatus } from '@prisma/client';

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
}