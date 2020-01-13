import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIncomings } from 'app/shared/model/mySportFinancial/incomings.model';
import { IncomingsService } from './incomings.service';

@Component({
  templateUrl: './incomings-delete-dialog.component.html'
})
export class IncomingsDeleteDialogComponent {
  incomings: IIncomings;

  constructor(protected incomingsService: IncomingsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.incomingsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'incomingsListModification',
        content: 'Deleted an incomings'
      });
      this.activeModal.dismiss(true);
    });
  }
}
