import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ description: 'The email of the user.' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user.' })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
