import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../types/event';
import { CreateEventInput } from './dto/event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { EventType } from '../models/event.type';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<EventType>,
  ) {}

  async showAll(): Promise<Event[]> {
    return this.eventModel.find();
  }

  async create(eventDTO: Event): Promise<EventType> {
    const createdEvent = new this.eventModel(eventDTO);
    return createdEvent.save();
  }

  async update(id: string, newEvent: UpdateEventInput) {
    const event: Event = await this.eventModel.findOne({ _id: id });

    if (event === undefined || event === null) {
      throw new HttpException(`Event doesn't exists`, HttpStatus.BAD_REQUEST);
    }

    const updateEvent: CreateEventInput = {
      ...event,
      ...newEvent,
    };

    return this.eventModel.findOneAndUpdate(
      { _id: id },
      {
        ...updateEvent,
      },
      {
        new: true,
      },
    );
  }

  async deleteEventById(id: string) {
    const event = await this.eventModel.findOne({ _id: id });

    if (event === undefined || event === null) {
      throw new HttpException(`Event doesn't exists`, HttpStatus.BAD_REQUEST);
    }

    return this.eventModel.findByIdAndRemove(id);
  }
}
