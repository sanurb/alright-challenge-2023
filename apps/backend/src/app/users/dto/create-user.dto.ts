import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsArray()
  roles: string[];

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
