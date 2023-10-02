import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { StatusModel, StatusSchema } from './model'
import { StatusController } from './status.controller'
import { StatusService } from './status.service'
import { TaskModule } from 'src/task/task.module'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: StatusModel.name, schema: StatusSchema },
		]),
		forwardRef(() => TaskModule),
	],
	providers: [StatusService],
	controllers: [StatusController],
	exports: [StatusService],
})
export class StatusModule {}
