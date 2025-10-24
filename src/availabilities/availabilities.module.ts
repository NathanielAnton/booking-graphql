import { Module } from '@nestjs/common';
import { AvailabilitiesService } from './availabilities.service';
import { AvailabilitiesResolver } from './availabilities.resolver';

@Module({
  providers: [AvailabilitiesService, AvailabilitiesResolver],
})
export class AvailabilitiesModule {}