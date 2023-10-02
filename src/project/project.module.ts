import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TaskModule } from 'src/task/task.module'
import { ProjectModel, ProjectSchema } from './model'
import { ProjectController } from './project.controller'
import { ProjectService } from './project.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: ProjectModel.name, schema: ProjectSchema },
		]),
		forwardRef(() => TaskModule),
	],
	providers: [ProjectService],
	controllers: [ProjectController],
	exports: [ProjectService],
})
export class ProjectModule {}
