import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @Length(5, 200)
  email: string;

  @ApiProperty()
  @Length(6, 200)
  password: string;

  @ApiProperty()
  @Length(6, 200)
  passwordRepeat: string;
}
