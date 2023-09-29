import { ApiProperty } from '@nestjs/swagger';
import { IStatus } from '../interface';

export class StatusDto implements IStatus {
  @ApiProperty({ example: '64c3eeb87984df7cca567311' })
  id: string;

  @ApiProperty({ example: 'Done' })
  title: string;
}
