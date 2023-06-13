import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { ContractFacadeService } from '@nx-giant/contract/data-access';

@Component({
  selector: 'nx-giant-dialog-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-upload.component.html',
  styleUrls: ['./dialog-upload.component.sass'],
})
export class DialogUploadComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef);
  private facade = inject(ContractFacadeService);

  selectedFileName: string | null = null;

  uploadForm = this.fb.group({
    title: ['', Validators.required],
    file: [null, Validators.required],
  });

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFileName = file.name;
      this.uploadForm.patchValue({ file: file });
    }
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      // Implement the upload functionality here
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
