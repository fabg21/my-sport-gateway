import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISeason } from 'app/shared/model/mySportTeam/season.model';
import { SeasonService } from './season.service';
import { SeasonDeleteDialogComponent } from './season-delete-dialog.component';

@Component({
  selector: 'jhi-season',
  templateUrl: './season.component.html'
})
export class SeasonComponent implements OnInit, OnDestroy {
  seasons: ISeason[];
  eventSubscriber: Subscription;

  constructor(protected seasonService: SeasonService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.seasonService.query().subscribe((res: HttpResponse<ISeason[]>) => {
      this.seasons = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInSeasons();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISeason) {
    return item.id;
  }

  registerChangeInSeasons() {
    this.eventSubscriber = this.eventManager.subscribe('seasonListModification', () => this.loadAll());
  }

  delete(season: ISeason) {
    const modalRef = this.modalService.open(SeasonDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.season = season;
  }
}
