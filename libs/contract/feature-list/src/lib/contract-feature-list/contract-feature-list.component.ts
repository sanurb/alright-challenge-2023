import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractFacadeService } from '@nx-giant/contract/data-access';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TitleComponent } from '@nx-giant/shared/ui';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogUploadComponent } from '../dialog-upload/dialog-upload.component';

@Component({
  selector: 'nx-giant-contract-feature-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    TitleComponent,
    MatDialogModule,
  ],
  templateUrl: './contract-feature-list.component.html',
  styleUrls: ['./contract-feature-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractFeatureListComponent implements OnInit {
  private facade = inject(ContractFacadeService);
  private readonly dialog = inject(MatDialog);

  readonly columndefs = [
    'policyNumber',
    'createdOn',
    'insuranceStart',
    'customer',
  ];
  readonly contracts$ = this.facade.contracts$;

  ngOnInit(): void {
    this.facade.loadAllContracts();
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(DialogUploadComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
