import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISpending } from 'app/shared/model/mySportFinancial/spending.model';
import { SpendingService } from './spending.service';

@Component({
  templateUrl: './spending-delete-dialog.component.html'
})
export class SpendingDeleteDialogComponent {
  spending: ISpending;

  constructor(protected spendingService: SpendingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.spendingService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'spendingListModification',
        content: 'Deleted an spending'
      });
      this.activeModal.dismiss(true);
    });
  }
}
