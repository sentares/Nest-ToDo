import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentModel } from './model';
import { Model } from 'mongoose';
import { IComment } from './interface';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/user/user.service';
import { CreateCommentDto } from './dto';
import { IUser } from 'src/user/interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(CommentModel.name)
    private readonly commentModel: Model<CommentModel>,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

  async getAll(): Promise<IComment[]> {
    return await this.commentModel.find().populate('author');
  }

  async getOne(id: string): Promise<IComment> {
    const comment = await this.commentModel.findById(id);
    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    return (await comment.populate('status')).populate('priority');
  }

  async getCommentsByTaskId(taskId: string): Promise<IComment[]> {
    const comments = await this.commentModel
      .find({ taskId: taskId })
      .populate('author');
    return comments;
  }

  async create(data: CreateCommentDto, user: IUser): Promise<IComment> {
    const { title, taskId, responseToComId } = data;
    const publishedAt = Date.now();

    const newComment: IComment = new this.commentModel({
      title,
      author: user,
      createdAt: publishedAt,
      taskId,
      responseToComId,
    });

    await newComment.save();

    return newComment;
  }
}
