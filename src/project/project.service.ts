import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateProjectDto } from './dto'
import { IProject } from './interface'
import { ProjectModel } from './model'

@Injectable()
export class ProjectService {
	constructor(
		@InjectModel(ProjectModel.name)
		private readonly projectModel: Model<ProjectModel>
	) {}

	async getAll(): Promise<IProject[]> {
		return await this.projectModel.find()
	}

	async getOne(id: string): Promise<IProject> {
		const project = await this.projectModel.findById(id)
		if (!project) {
			throw new NotFoundException('project not found')
		}
		return project
	}

	async create(data: CreateProjectDto): Promise<IProject> {
		const { name } = data

		const exist = await this.projectModel.findOne({ name })
		if (exist) {
			throw new ConflictException('Such project already exists')
		}

		const newProject = new this.projectModel({ name })
		return await newProject.save()
	}
}
