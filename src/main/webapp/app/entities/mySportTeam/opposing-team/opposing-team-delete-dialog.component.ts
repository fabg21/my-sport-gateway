import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOpposingTeam } from 'app/shared/model/mySportTeam/opposing-team.model';
import { OpposingTeamService } from './opposing-team.service';

@Component({
  templateUrl: './opposing-team-delete-dialog.component.html'
})
export class OpposingTeamDeleteDialogComponent {
  opposingTeam: IOpposingTeam;

  constructor(
    protected opposingTeamService: OpposingTeamService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.opposingTeamService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'opposingTeamListModification',
        content: 'Deleted an opposingTeam'
      });
      this.activeModal.dismiss(true);
    });
  }
}
