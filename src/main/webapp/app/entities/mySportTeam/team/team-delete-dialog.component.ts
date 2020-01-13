import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITeam } from 'app/shared/model/mySportTeam/team.model';
import { TeamService } from './team.service';

@Component({
  templateUrl: './team-delete-dialog.component.html'
})
export class TeamDeleteDialogComponent {
  team: ITeam;

  constructor(protected teamService: TeamService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.teamService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'teamListModification',
        content: 'Deleted an team'
      });
      this.activeModal.dismiss(true);
    });
  }
}
