import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ServiceOfferingsService } from './service-offerings.service';
import { ServiceOffering, ServiceOfferingWithRelations } from '../shared/dto/service-offering.dto';

@Resolver(() => ServiceOffering)
export class ServiceOfferingsResolver {
  constructor(private readonly serviceOfferingsService: ServiceOfferingsService) {}

  @Query(() => [ServiceOffering])
  serviceOfferings(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.serviceOfferingsService.findAll({ limit, skip });
  }

  @Query(() => ServiceOffering, { nullable: true })
  serviceOffering(@Args('id', { type: () => Int }) id: number) {
    return this.serviceOfferingsService.findOne(id);
  }

  @Query(() => [ServiceOffering])
  serviceOfferingsByService(
    @Args('serviceId', { type: () => Int }) serviceId: number,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.serviceOfferingsService.findByService(serviceId, { limit, skip });
  }

  @Query(() => [ServiceOffering])
  serviceOfferingsByIntervenant(
    @Args('intervenantId', { type: () => Int }) intervenantId: number,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.serviceOfferingsService.findByIntervenant(intervenantId, { limit, skip });
  }

  @Query(() => ServiceOffering, { nullable: true })
  serviceOfferingByServiceAndIntervenant(
    @Args('serviceId', { type: () => Int }) serviceId: number,
    @Args('intervenantId', { type: () => Int }) intervenantId: number,
  ) {
    return this.serviceOfferingsService.findByServiceAndIntervenant(serviceId, intervenantId);
  }

  @Query(() => [ServiceOfferingWithRelations])
  serviceOfferingsWithRelations(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.serviceOfferingsService.findAllWithRelations({ limit, skip });
  }

  @Query(() => ServiceOfferingWithRelations, { nullable: true })
  serviceOfferingWithRelations(@Args('id', { type: () => Int }) id: number) {
    return this.serviceOfferingsService.findOneWithRelations(id);
  }

  @Query(() => [ServiceOfferingWithRelations])
  serviceOfferingsByServiceWithRelations(
    @Args('serviceId', { type: () => Int }) serviceId: number,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.serviceOfferingsService.findByServiceWithRelations(serviceId, { limit, skip });
  }

  @Query(() => [ServiceOfferingWithRelations])
  serviceOfferingsByIntervenantWithRelations(
    @Args('intervenantId', { type: () => Int }) intervenantId: number,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.serviceOfferingsService.findByIntervenantWithRelations(intervenantId, { limit, skip });
  }

  @Query(() => ServiceOfferingWithRelations, { nullable: true })
  serviceOfferingByServiceAndIntervenantWithRelations(
    @Args('serviceId', { type: () => Int }) serviceId: number,
    @Args('intervenantId', { type: () => Int }) intervenantId: number,
  ) {
    return this.serviceOfferingsService.findByServiceAndIntervenantWithRelations(serviceId, intervenantId);
  }
}