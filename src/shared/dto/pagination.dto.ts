import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Booking, BookingWithRelations } from './booking.dto';

@ObjectType()
export class PageInfo {
  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  skip: number;

  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;
}

@ObjectType()
export class PaginatedBookings {
  @Field(() => [Booking])
  items: Booking[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class PaginatedBookingsWithRelations {
  @Field(() => [BookingWithRelations])
  items: BookingWithRelations[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
