import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Availability {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  dayOfWeek: number;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field()
  isAvailable: boolean;
}