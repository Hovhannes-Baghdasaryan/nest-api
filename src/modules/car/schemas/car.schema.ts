import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Owner } from 'modules/owner/schemas';
import mongoose from 'mongoose';

@Schema({
  versionKey: false,
})
export class Car {
  @Prop({ unique: true, index: true })
  price: number;

  @Prop()
  brand: string;

  @Prop()
  year: number;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Owner.name }])
  owners: [Owner];
}

export const CarSchema = SchemaFactory.createForClass(Car);
