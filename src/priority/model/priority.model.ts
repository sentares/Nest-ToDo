import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IPriority } from '../interface';

@Schema()
export class PriorityModel implements IPriority {
  @Prop({ alias: '_id' })
  id: string;

  @Prop()
  title: string;
}

export const PrioritySchema = SchemaFactory.createForClass(PriorityModel);
