import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { PriorityModel } from 'src/priority/model';
import { ProjectModel } from 'src/project/model';
import { StatusModel } from 'src/status/model';
import { UserModel } from 'src/user/model';
import { ITask } from '../interface';

@Schema()
export class TaskModel implements ITask {
  @Prop({ alias: '_id' })
  id: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'StatusModel' })
  status: StatusModel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PriorityModel' })
  priority: PriorityModel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectModel' })
  project: ProjectModel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' })
  users?: UserModel[];

  @Prop([String])
  images?: string[];

  @Prop()
  publishedAt: number;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
