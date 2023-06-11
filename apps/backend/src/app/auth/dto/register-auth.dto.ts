import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @MinLength(3)
  @MaxLength(20)
  name: string;

  @MinLength(6)
  @MaxLength(20)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message:
        'Password must have at least 6 characters, one uppercase, one lowercase, one number and one special character',
    }
  )
  password: string;
}
