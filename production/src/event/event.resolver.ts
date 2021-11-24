import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { EventService } from './event.service';
import { UpdateEventInput } from './dto/update-event.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../guards/gql-auth.guard';
import { EventType } from '../models/event.type';
import { RolesGuard } from '../guards/roles.guard';

@UseGuards(GraphqlAuthGuard)
@UseGuards(RolesGuard)
@Resolver()
export class EventResolver {
  constructor(private eventService: EventService) {}

  @Query(returns => [EventType])
  async events() {
    return this.eventService.showAll();
  }

  @Mutation(returns => EventType)
  async createEvent(
    @Args('host') host: string,
    @Args('beginsAt') beginsAt: string,
  ) {
    return this.eventService.create({ host, beginsAt });
  }

  @Mutation(returns => EventType)
  async deleteEvent(@Args('id') id: string) {
    return this.eventService.deleteEventById(id);
  }

  @Mutation(returns => EventType)
  async updateEvent(
    @Args('id') id: string,
    @Args('host') host: string,
    @Args('beginsAt') beginsAt: string,
  ) {
    return this.eventService.update(id, { host, beginsAt });
  }
}
