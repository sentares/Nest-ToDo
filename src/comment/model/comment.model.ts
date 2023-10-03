import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserModel } from 'src/user/model';
import { IComment } from '../interface';

@Schema()
export class CommentModel implements IComment {
  @Prop({ alias: '_id' })
  id: string;

  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' })
  author: UserModel;

  @Prop()
  taskId: string;

  @Prop()
  createdAt: number;

  @Prop()
  responseToComId?: string;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
