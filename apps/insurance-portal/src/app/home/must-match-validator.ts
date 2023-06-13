import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MatchPassword(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }

    if (matchingControl.errors && !matchingControl.errors['notMatch']) {
      return null;
    }

    if (control.value.toLowerCase() !== matchingControl.value.toLowerCase()) {
      matchingControl.setErrors({ notMatch: true });
      return { notMatch: true };
    } else {
      return null;
    }
  };
}
