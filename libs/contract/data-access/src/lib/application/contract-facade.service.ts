import { HttpEvent, HttpEventType } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { exhaustMap, map, Observable, of, pipe } from 'rxjs';
import { Contract } from '../entities/contract.model';
import { ContractService } from '../infrastructure/contract.service';
import { StorageService } from '@nx-giant/shared/util';
import { Customer } from '../entities/customer.model';

interface State {
  contracts: Contract[];
}

@Injectable({
  providedIn: 'root',
})
export class ContractFacadeService extends ComponentStore<State> {
  private contractService = inject(ContractService);
  private readonly storageService = inject(StorageService);

  readonly contracts$ = this.select(({ contracts }) => contracts);

  readonly loadAllContracts = this.effect<void>(
    pipe(
      exhaustMap(() => this.contractService.getAll()),
      tapResponse((contracts) => this.patchState({ contracts }), console.error)
    )
  );

  constructor() {
    super({
      contracts: [],
    });
  }

  getContract(id: string): Observable<Contract> {
    return this.select(({ contracts }) =>
      contracts.find((c) => c.id === id)
    ).pipe(
      exhaustMap((contract) =>
        contract ? of(contract) : this.contractService.get(id)
      )
    );
  }

  uploadFile(file: File, title: string) {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('title', title);
    formData.append('userId', (this.storageService.get('user') as Customer).id);

    return this.contractService.upload(formData).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );
  }
}
