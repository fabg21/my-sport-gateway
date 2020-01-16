import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMatch } from 'app/shared/model/mySportTeam/match.model';
import { MatchService } from './match.service';
import { MatchDeleteDialogComponent } from './match-delete-dialog.component';

@Component({
  selector: 'jhi-match',
  templateUrl: './match.component.html'
})
export class MatchComponent implements OnInit, OnDestroy {
  matches: IMatch[];
  eventSubscriber: Subscription;

  constructor(protected matchService: MatchService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.matchService.query().subscribe((res: HttpResponse<IMatch[]>) => {
      this.matches = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInMatches();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMatch) {
    return item.id;
  }

  registerChangeInMatches() {
    this.eventSubscriber = this.eventManager.subscribe('matchListModification', () => this.loadAll());
  }

  delete(match: IMatch) {
    const modalRef = this.modalService.open(MatchDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.match = match;
  }
}
