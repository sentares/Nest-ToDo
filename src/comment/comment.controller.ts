import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { IComment } from './interface';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard';
import { CreateCommentDto } from './dto';
import { CurrentUser } from 'src/auth/decorator';
import { IUser } from 'src/user/interface';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Get()
  async getAll(): Promise<IComment[]> {
    return await this.service.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<IComment> {
    return await this.service.getOne(id);
  }

  @Get('byProject/:taskId')
  async getTasksByTaskId(@Param('taskId') taskId: string): Promise<IComment[]> {
    return this.service.getCommentsByTaskId(taskId);
  }

  @Post('to/:taskId')
  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  async create(
    @Param('taskId') taskId: string,
    @Body() data: CreateCommentDto,
    @CurrentUser() user: IUser,
  ) {
    return await this.service.create(taskId, data, user);
  }
}
