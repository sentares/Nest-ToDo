import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user1' })
  email: string;

  @ApiProperty({ example: 'qwerty' })
  password: string;
}
