import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesResolver } from './services.resolver';
import { ServiceOfferingsService } from '../service-offerings/service-offerings.service';
import { ServiceOfferingsResolver } from '../service-offerings/service-offerings.resolver';

@Module({
  providers: [
    ServicesService, 
    ServicesResolver, 
    ServiceOfferingsService, 
    ServiceOfferingsResolver
  ],
})
export class ServicesModule {}