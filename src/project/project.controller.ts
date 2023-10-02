import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateProjectDto } from './dto'
import { IProject } from './interface'
import { ProjectService } from './project.service'

@ApiTags('Project')
@Controller('project')
export class ProjectController {
	constructor(private readonly service: ProjectService) {}

	@Get()
	async getAll(): Promise<IProject[]> {
		return await this.service.getAll()
	}

	@Get('/:id')
	async getOne(@Param('id') id: string): Promise<IProject> {
		return await this.service.getOne(id)
	}

	@Post()
	async create(@Body() data: CreateProjectDto): Promise<IProject> {
		return await this.service.create(data)
	}
}
