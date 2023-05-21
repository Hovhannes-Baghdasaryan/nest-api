import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
export class Owner {
  @Prop({ unique: true, index: true })
  name: string;

  @Prop({ default: null })
  age?: number | null;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
