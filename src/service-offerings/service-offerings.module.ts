import { Module } from '@nestjs/common';
import { ServiceOfferingsResolver } from './service-offerings.resolver';
import { ServiceOfferingsService } from './service-offerings.service';

@Module({
  providers: [ServiceOfferingsResolver, ServiceOfferingsService]
})
export class ServiceOfferingsModule {}
