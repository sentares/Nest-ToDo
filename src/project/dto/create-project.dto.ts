import { ApiProperty } from '@nestjs/swagger'
import { IProject } from '../interface'

export class CreateProjectDto implements IProject {
	@ApiProperty()
	id: string

	@ApiProperty({ example: 'Test1' })
	name: string
}
