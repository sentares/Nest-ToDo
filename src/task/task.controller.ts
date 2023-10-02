import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { ITask } from './interface';
import { TaskService } from './task.service';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get()
  async getAll(): Promise<ITask[]> {
    return await this.service.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<ITask> {
    return await this.service.getOne(id);
  }

  @Get('byProject/:projectId')
  async getTasksByProjectId(
    @Param('projectId') projectId: string,
  ): Promise<ITask[]> {
    return this.service.getTasksByProjectId(projectId);
  }

  @Post()
  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 10))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() data: CreateTaskDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.service.create(data, images);
  }

  @Delete('/:id')
  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  async deleteOne(@Param('id') id: string) {
    return await this.service.deleteOne(id);
  }

  @Patch('/:id')
  // @ApiSecurity('bearer')
  // @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 10))
  @ApiConsumes('multipart/form-data')
  async updateTask(
    @Param('id') id: string,
    @Body() data: UpdateTaskDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.service.updateTask(id, data, images);
  }
}
