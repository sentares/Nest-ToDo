import { IUser } from 'src/user/interface';

export interface IComment {
  id: string;
  title: string;
  author: IUser;
  taskId: string;
  createdAt: number;
  responseToComId?: string;

  save?();
}
