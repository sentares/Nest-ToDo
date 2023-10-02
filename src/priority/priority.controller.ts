import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { IPriority } from './interface'
import { PriorityService } from './priority.service'

@ApiTags('Priority')
@Controller('priority')
export class PriorityController {
	constructor(private readonly service: PriorityService) {}

	@Get()
	async getAll(): Promise<IPriority[]> {
		return await this.service.getAll()
	}

	@Get('/:id')
	async getOne(@Param('id') id: string): Promise<IPriority> {
		return await this.service.getOne(id)
	}

	// @Post()
	// async create(@Body() data: PriorityDto): Promise<IPriority> {
	//   return await this.service.create(data);
	// }
}
