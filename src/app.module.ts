import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { EventsModule } from './events/events.module';
import { AvailabilitiesModule } from './availabilities/availabilities.module';
import { ServicesModule } from './services/services.module';
import { ServiceOfferingsModule } from './service-offerings/service-offerings.module';

@Module({
  imports: [
    DatabaseModule, 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    UsersModule,
    BookingsModule,
    EventsModule,
    AvailabilitiesModule,
    ServicesModule,
    ServiceOfferingsModule,
  ],
})
export class AppModule {}