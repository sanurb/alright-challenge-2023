import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerFacadeService } from '@nx-giant/customer/data-access';
import { MatchPassword } from './must-match-validator';

@Component({
  selector: 'nx-giant-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly customerFacade = inject(CustomerFacadeService);

  isRegisterMode = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  registerForm = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      marketingAccept: [false],
    },
    { validators: MatchPassword('password', 'confirmPassword') }
  );

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  switchMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
  }

  submit(): void {
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.customerFacade.userLogin({ email, password });
  }

  register(): void {
    const { name, email, password } = this.registerForm.value;

    if (!this.registerForm.valid || !email || !password || !name) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.customerFacade.addCustomer({ name, email, password });
  }
}
