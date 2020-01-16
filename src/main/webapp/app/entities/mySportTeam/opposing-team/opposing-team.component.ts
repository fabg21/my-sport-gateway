import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOpposingTeam } from 'app/shared/model/mySportTeam/opposing-team.model';
import { OpposingTeamService } from './opposing-team.service';
import { OpposingTeamDeleteDialogComponent } from './opposing-team-delete-dialog.component';

@Component({
  selector: 'jhi-opposing-team',
  templateUrl: './opposing-team.component.html'
})
export class OpposingTeamComponent implements OnInit, OnDestroy {
  opposingTeams: IOpposingTeam[];
  eventSubscriber: Subscription;

  constructor(
    protected opposingTeamService: OpposingTeamService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.opposingTeamService.query().subscribe((res: HttpResponse<IOpposingTeam[]>) => {
      this.opposingTeams = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInOpposingTeams();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOpposingTeam) {
    return item.id;
  }

  registerChangeInOpposingTeams() {
    this.eventSubscriber = this.eventManager.subscribe('opposingTeamListModification', () => this.loadAll());
  }

  delete(opposingTeam: IOpposingTeam) {
    const modalRef = this.modalService.open(OpposingTeamDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.opposingTeam = opposingTeam;
  }
}
