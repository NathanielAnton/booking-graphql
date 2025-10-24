import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilitiesResolver } from './availabilities.resolver';

describe('AvailabilitiesResolver', () => {
  let resolver: AvailabilitiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvailabilitiesResolver],
    }).compile();

    resolver = module.get<AvailabilitiesResolver>(AvailabilitiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
