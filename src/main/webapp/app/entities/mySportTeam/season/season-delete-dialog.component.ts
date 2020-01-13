import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISeason } from 'app/shared/model/mySportTeam/season.model';
import { SeasonService } from './season.service';

@Component({
  templateUrl: './season-delete-dialog.component.html'
})
export class SeasonDeleteDialogComponent {
  season: ISeason;

  constructor(protected seasonService: SeasonService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.seasonService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'seasonListModification',
        content: 'Deleted an season'
      });
      this.activeModal.dismiss(true);
    });
  }
}
