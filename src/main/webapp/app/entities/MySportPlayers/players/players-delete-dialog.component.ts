import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlayers } from 'app/shared/model/MySportPlayers/players.model';
import { PlayersService } from './players.service';

@Component({
  templateUrl: './players-delete-dialog.component.html'
})
export class PlayersDeleteDialogComponent {
  players: IPlayers;

  constructor(protected playersService: PlayersService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.playersService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'playersListModification',
        content: 'Deleted an players'
      });
      this.activeModal.dismiss(true);
    });
  }
}
