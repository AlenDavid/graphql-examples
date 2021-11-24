import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  host: { type: String, required: true },
  beginsAt: { type: String, required: true },
});
