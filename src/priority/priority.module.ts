import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TaskModule } from 'src/task/task.module'
import { PriorityModel, PrioritySchema } from './model'
import { PriorityController } from './priority.controller'
import { PriorityService } from './priority.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: PriorityModel.name, schema: PrioritySchema },
		]),
		forwardRef(() => TaskModule),
	],
	providers: [PriorityService],
	controllers: [PriorityController],
	exports: [PriorityService],
})
export class PriorityModule {}
