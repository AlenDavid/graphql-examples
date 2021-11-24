import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
  ],
  providers: [EventService, EventResolver],
  exports: [
    EventService,
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
  ],
})
export class EventModule {}
