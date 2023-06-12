import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { VALIDATION_MESSAGES } from '../../../../config/constants/messages.constants';
import { REGEX_CONSTANTS } from '../../../../config/constants/regex.constants';

@ValidatorConstraint({ name: 'password', async: false })
export class PasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    return REGEX_CONSTANTS.PASSWORD.test(password);
  }

  defaultMessage(args: ValidationArguments) {
    return VALIDATION_MESSAGES.PASSWORD;
  }
}
