import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IStatus } from '../interface';

@Schema()
export class StatusModel implements IStatus {
  @Prop({ alias: '_id' })
  id: string;

  @Prop()
  title: string;
}

export const StatusSchema = SchemaFactory.createForClass(StatusModel);
