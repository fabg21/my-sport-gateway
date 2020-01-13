import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlayers } from 'app/shared/model/MySportPlayers/players.model';
import { PlayersService } from './players.service';
import { PlayersDeleteDialogComponent } from './players-delete-dialog.component';

@Component({
  selector: 'jhi-players',
  templateUrl: './players.component.html'
})
export class PlayersComponent implements OnInit, OnDestroy {
  players: IPlayers[];
  eventSubscriber: Subscription;

  constructor(protected playersService: PlayersService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.playersService.query().subscribe((res: HttpResponse<IPlayers[]>) => {
      this.players = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInPlayers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlayers) {
    return item.id;
  }

  registerChangeInPlayers() {
    this.eventSubscriber = this.eventManager.subscribe('playersListModification', () => this.loadAll());
  }

  delete(players: IPlayers) {
    const modalRef = this.modalService.open(PlayersDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.players = players;
  }
}
