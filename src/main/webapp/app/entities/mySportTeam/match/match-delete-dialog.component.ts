import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMatch } from 'app/shared/model/mySportTeam/match.model';
import { MatchService } from './match.service';

@Component({
  templateUrl: './match-delete-dialog.component.html'
})
export class MatchDeleteDialogComponent {
  match: IMatch;

  constructor(protected matchService: MatchService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.matchService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'matchListModification',
        content: 'Deleted an match'
      });
      this.activeModal.dismiss(true);
    });
  }
}
