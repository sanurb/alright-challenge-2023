import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Customer } from '@nx-giant/customer/data-access';
import { distinctUntilChanged, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'nx-giant-customer-form[disabled]',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFormComponent implements OnInit {
  @Input() set disabled(value: boolean) {
    if (value) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
  @Output() save = new EventEmitter<Customer>();
  @Output() dirtyOrTouchedChanges = new EventEmitter<boolean>();

  private fb = inject(FormBuilder);

  dirtyOrTouchedChanges$!: Observable<boolean>;
  readonly form = this.fb.nonNullable.group({
    name: this.fb.control<string>('', Validators.required),
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.control<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  ngOnInit() {
    this.dirtyOrTouchedChanges$ = this.form.valueChanges.pipe(
      map(() => this.form.dirty || this.form.touched),
      distinctUntilChanged(),
      tap((dirty) => this.dirtyOrTouchedChanges.emit(dirty))
    );
  }

  onSubmit() {
    const customer: Customer = {
      ...this.form.getRawValue(),
    } as Customer;

    this.save.emit(customer);
  }

  get name() {
    return this.form.controls.name;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }
}
