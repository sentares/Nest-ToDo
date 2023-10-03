import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IProject } from '../interface';

@Schema()
export class ProjectModel implements IProject {
  @Prop({ alias: '_id' })
  id: string;

  @Prop()
  name: string;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectModel);
