import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOfferingsResolver } from './service-offerings.resolver';

describe('ServiceOfferingsResolver', () => {
  let resolver: ServiceOfferingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceOfferingsResolver],
    }).compile();

    resolver = module.get<ServiceOfferingsResolver>(ServiceOfferingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
