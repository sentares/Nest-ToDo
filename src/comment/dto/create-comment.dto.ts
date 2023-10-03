import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length, Matches } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Good House' })
  @Length(2, 200)
  title: string;

  @ApiProperty({ example: '65170ccc1233e7921f7b19ae' })
  @Length(24, 24)
  @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/, {
    message: 'Invalid ID',
  })
  taskId: string;

  @ApiProperty({ example: '6500456fd8016c679512bb21' })
  @IsOptional()
  @Length(24, 24)
  @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/, {
    message: 'Invalid ID',
  })
  responseToComId?: string;
}
