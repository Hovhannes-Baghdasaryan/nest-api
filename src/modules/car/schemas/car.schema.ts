import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  versionKey: false,
})
export class Car {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop()
  price: number;

  @Prop()
  brand: string;

  @Prop()
  year: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
