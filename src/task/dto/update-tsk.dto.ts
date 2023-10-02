import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, Length } from 'class-validator'
import { IUser } from 'src/user/interface'

export class UpdateTaskDto {
	@ApiPropertyOptional({ example: 'Good House' })
	@IsOptional()
	@Length(5, 200)
	title?: string

	@ApiPropertyOptional()
	@IsOptional()
	statusId?: string

	@ApiPropertyOptional()
	@IsOptional()
	priorityId?: string

	@ApiPropertyOptional()
	@IsOptional()
	images?: string[]

	@ApiPropertyOptional()
	@IsOptional()
	users?: IUser[]
}
