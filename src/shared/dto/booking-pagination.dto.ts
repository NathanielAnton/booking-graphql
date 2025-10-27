import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BookingWithRelations } from './booking.dto';
import { PageInfo } from './pagination.dto';

@ObjectType()
export class BookingPagination {
  @Field(() => [BookingWithRelations])
  nodes: BookingWithRelations[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
