import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IStatus } from './interface';
import { StatusService } from './status.service';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly service: StatusService) {}

  @Get()
  async getAll(): Promise<IStatus[]> {
    return await this.service.getAll();
  }

  // @Post()
  // async create(@Body() data: StatusDto): Promise<IStatus> {
  //   return await this.service.create(data);
  // }
}
