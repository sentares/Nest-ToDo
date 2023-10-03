import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import * as path from 'path';
import { PriorityService } from 'src/priority/priority.service';
import { ProjectService } from 'src/project/project.service';
import { StatusService } from 'src/status/status.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { ITask } from './interface';
import { TaskModel } from './model ';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskModel.name) private readonly taskModel: Model<TaskModel>,
    private readonly statusService: StatusService,
    private readonly priorityService: PriorityService,
    private readonly projectService: ProjectService,
  ) {}

  async getAll(): Promise<ITask[]> {
    return await this.taskModel
      .find()
      .populate('status')
      .populate('priority')
      .populate('project');
  }

  async getOne(id: string): Promise<ITask> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return (await task.populate('status')).populate('priority');
  }

  async getTasksByProjectId(projectId: string): Promise<ITask[]> {
    const project = await this.projectService.getOne(projectId);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    const tasks = await this.taskModel
      .find({ project: project })
      .populate('status')
      .populate('priority')
      .populate('project');
    return tasks;
  }

  async create(
    data: CreateTaskDto,
    images?: Express.Multer.File[],
  ): Promise<ITask> {
    const { title, description, statusId, priorityId, projectId } = data;
    const project = await this.projectService.getOne(projectId);
    const status = await this.statusService.getOne(statusId);
    const priority = await this.priorityService.getOne(priorityId);
    // const imagePaths = images.map((image) =>
    //   path.join(__dirname, '../../', 'images', image.filename),
    // );

    const publishedAt = Date.now();

    const newtask: ITask = new this.taskModel({
      title,
      description,
      status,
      priority,
      project,
      // images: imagePaths,
      publishedAt: publishedAt,
    });

    console.log(description, 'description');

    await newtask.save();

    return newtask;
  }

  async deleteOne(id: string) {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException('task not found');
    }

    task.images.forEach((imagePath) => {
      const fullPath = path.join(__dirname, '../../', 'images', imagePath);
      fs.unlinkSync(fullPath);
    });

    await task.deleteOne();

    Logger.log('task deleted', TaskService.name);
    return 'task deleted successfully';
  }

  async updateTask(
    id: string,
    data: UpdateTaskDto,
    images: Express.Multer.File[],
  ) {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (data.title !== undefined && data.title.length > 0) {
      task.title = data.title;
    }

    if (data.description !== undefined && data.description.length > 0) {
      task.description = data.description;
    }

    if (data.statusId !== undefined && data.statusId.length > 0) {
      const status = await this.statusService.getOne(data.statusId);
      task.status = status;
    }

    if (data.priorityId !== undefined && data.priorityId.length > 0) {
      const priority = await this.priorityService.getOne(data.priorityId);
      task.priority = priority;
    }

    if (images && images.length > 0) {
      const imagePaths = images.map((image) => image.filename);
      task.images = imagePaths;
    }

    await task.save();

    return (await task.populate('status')).populate('priority');
  }
}
