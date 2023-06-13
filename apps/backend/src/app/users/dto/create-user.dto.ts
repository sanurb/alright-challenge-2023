import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The email of the user.' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The password of the user.' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'The roles of the user.' })
  @IsOptional()
  @IsArray()
  roles: string[];

  @ApiProperty({ description: 'The name of the user.' })
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  description: string;
}
