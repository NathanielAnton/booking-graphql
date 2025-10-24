import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Service } from './service.dto';
import { User } from './user.dto';

@ObjectType()
export class ServiceOffering {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  serviceId: number;

  @Field(() => Int)
  intervenantId: number;
}

@ObjectType()
export class ServiceOfferingWithRelations {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  serviceId: number;

  @Field(() => Int)
  intervenantId: number;

  @Field(() => Service)
  service: Service;

  @Field(() => User)
  intervenant: User;
}