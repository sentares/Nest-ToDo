import { IPriority } from 'src/priority/interface';
import { IProject } from 'src/project/interface';
import { IStatus } from 'src/status/interface';
import { IUser } from 'src/user/interface';

export interface ITask {
  id: string;
  title: string;
  status: IStatus;
  priority: IPriority;
  project: IProject;
  users?: IUser[];
  images?: string[];
  publishedAt: number;

  save?();
}
