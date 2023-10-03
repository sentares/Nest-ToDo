import { ApiProperty } from '@nestjs/swagger';
import { Length, Matches } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Good House' })
  @Length(2, 200)
  title: string;

  @ApiProperty({ example: '6517079adaf95396814b245b' })
  @Length(24, 24)
  @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/, {
    message: 'Invalid ID',
  })
  statusId: string;

  @ApiProperty({ example: '65170ccc1233e7921f7b19ae' })
  @Length(24, 24)
  @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/, {
    message: 'Invalid ID',
  })
  priorityId: string;

  @ApiProperty({ example: '6500456fd8016c679512bb21' })
  @Length(24, 24)
  @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/, {
    message: 'Invalid ID',
  })
  projectId: string;

  @ApiProperty({ example: ['url1'] })
  users?: string[];

  @ApiProperty({ example: ['url1', 'url2', 'url3'] })
  images?: string[];
}
