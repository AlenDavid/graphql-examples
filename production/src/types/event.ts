import { Document } from 'mongoose';

export interface Event extends Document {
  beginsAt: string;
  host: string;
}
