import { IsEmail, MaxLength, MinLength, Validate } from 'class-validator';
import { PasswordConstraint } from '../utils/validators/password.constraint';
import { IsEmailAlreadyExist } from '../utils/validators/is-email-already-exist.constraint';

export class RegisterAuthDto {
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'Email already in use' })
  email: string;

  @MinLength(3, {
    message: 'Name must be longer than or equal to 3 characters',
  })
  @MaxLength(20, {
    message: 'Name must be shorter than or equal to 20 characters',
  })
  name: string;

  @MinLength(6, {
    message: 'Password must be longer than or equal to 6 characters',
  })
  @MaxLength(20, {
    message: 'Password must be shorter than or equal to 20 characters',
  })
  @Validate(PasswordConstraint)
  password: string;
}
