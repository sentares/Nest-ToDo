import { ApiProperty } from '@nestjs/swagger';
import { IPriority } from '../interface';

export class PriorityDto implements IPriority {
  @ApiProperty({ example: '64c3eeb87984df7cca567311' })
  id: string;

  @ApiProperty({ example: 'Urgent' })
  title: string;
}
