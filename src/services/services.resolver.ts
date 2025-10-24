import { Resolver, Query, Args, Int, Float } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { Service, ServiceWithRelations } from '../shared/dto/service.dto';

@Resolver(() => Service)
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Query(() => [Service])
  services(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.servicesService.findAll({ limit, skip });
  }

  @Query(() => Service, { nullable: true })
  service(@Args('id', { type: () => Int }) id: number) {
    return this.servicesService.findOne(id);
  }

  @Query(() => [Service])
  servicesByCategory(
    @Args('category') category: string,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.servicesService.findByCategory(category, { limit, skip });
  }

  @Query(() => [Service])
  searchServices(
    @Args('name') name: string,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.servicesService.searchByName(name, { limit, skip });
  }

  @Query(() => [Service])
  servicesByPriceRange(
    @Args('minPrice', { type: () => Float }) minPrice: number,
    @Args('maxPrice', { type: () => Float }) maxPrice: number,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.servicesService.findServicesByPriceRange(minPrice, maxPrice, { limit, skip });
  }

  @Query(() => [ServiceWithRelations])
  servicesWithRelations(
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.servicesService.findAllWithRelations({ limit, skip });
  }

  @Query(() => ServiceWithRelations, { nullable: true })
  serviceWithRelations(@Args('id', { type: () => Int }) id: number) {
    return this.servicesService.findOneWithRelations(id);
  }

  @Query(() => [ServiceWithRelations])
  servicesByCategoryWithRelations(
    @Args('category') category: string,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.servicesService.findByCategoryWithRelations(category, { limit, skip });
  }

  @Query(() => [ServiceWithRelations])
  searchServicesWithRelations(
    @Args('name') name: string,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.servicesService.searchByNameWithRelations(name, { limit, skip });
  }

  @Query(() => [ServiceWithRelations])
  servicesByPriceRangeWithRelations(
    @Args('minPrice', { type: () => Float }) minPrice: number,
    @Args('maxPrice', { type: () => Float }) maxPrice: number,
    @Args('limit', { type: () => Int, nullable: true }) limit = 20,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.servicesService.findServicesByPriceRangeWithRelations(minPrice, maxPrice, { limit, skip });
  }
}