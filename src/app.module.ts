import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'

import { PriorityModule } from './priority/priority.module'
import { ProjectModule } from './project/project.module'
import { StatusModule } from './status/status.module'
import { TaskModule } from './task/task.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				uri: config.get<string>('MONGODB_URI'),
			}),
		}),
		UserModule,
		AuthModule,
		StatusModule,
		PriorityModule,
		TaskModule,
		ProjectModule,
	],
})
export class AppModule {}
