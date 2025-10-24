import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { ServiceOfferingWithRelations } from './service-offering.dto'; 

@ObjectType()
export class Service {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  category?: string;

  @Field(() => Int)
  duration: number;

  @Field(() => Float)
  price: number;
}

@ObjectType()
export class ServiceWithRelations {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  category?: string;

  @Field(() => Int)
  duration: number;

  @Field(() => Float)
  price: number;

  @Field(() => [ServiceOfferingWithRelations])
  offerings: ServiceOfferingWithRelations[];
}